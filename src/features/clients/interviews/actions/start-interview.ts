"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/config";
import { interviewQuestionsPath, loginPath } from "@/constants/route";
import { AppError } from "@/middleware";
import { getSession } from "@/lib/get-Session";
import { secureShuffle } from "@/lib/shuffle";
import { getCategoryByIdSchema } from "@/features/admin/category/schema/get-categoryId.schema";
import { fetchQuestionsByDifficulty } from "../query/fetch-questions-by-difficulty";
import { Interview } from "@/generated/prisma/client";

export async function startInterview(categoryId: string) {
  const validation = getCategoryByIdSchema.safeParse({
    id: categoryId,
  });

  if (!validation.success) {
    throw new AppError(
      validation.error.issues[0]?.message ?? "Invalid category id",
      "INVALID_CATEGORY_ID",
      400,
    );
  }

  const session = await getSession();

  if (!session) {
    redirect(loginPath);
  }

  let interveiw: Interview | null;

  try {
    const category = await prisma.category.findUnique({
      where: {
        id: validation.data.id,
      },
      select: {
        id: true,
        name: true,
        isActive: true,
      },
    });

    if (!category) {
      throw new AppError("Category not found", "CATEGORY_NOT_FOUND", 404);
    }

    if (!category.isActive) {
      throw new AppError("Category is inactive", "CATEGORY_INACTIVE", 403);
    }

    /**
     * Parallel Fetch
     */
    const [easy, medium, hard] = await Promise.all([
      fetchQuestionsByDifficulty(category.id, "EASY"),
      fetchQuestionsByDifficulty(category.id, "MEDIUM"),
      fetchQuestionsByDifficulty(category.id, "HARD"),
    ]);

    /**
     * Validation
     */
    if (easy.total < 4) {
      throw new AppError(
        "Not enough easy questions",
        "INSUFFICIENT_EASY_QUESTIONS",
        400,
      );
    }

    if (medium.total < 4) {
      throw new AppError(
        "Not enough medium questions",
        "INSUFFICIENT_MEDIUM_QUESTIONS",
        400,
      );
    }

    if (hard.total < 2) {
      throw new AppError(
        "Not enough hard questions",
        "INSUFFICIENT_HARD_QUESTIONS",
        400,
      );
    }

    const selectedQuestions = [
      ...secureShuffle(easy.data).slice(0, 2),
      ...secureShuffle(medium.data).slice(0, 1),
      ...secureShuffle(hard.data).slice(0, 1),
    ];

    const finalQuestions = secureShuffle(selectedQuestions);

    /**
     * Transaction
     */
    interveiw = await prisma.$transaction(async (tx) => {
      const createdInterview = await tx.interview.create({
        data: {
          userId: session.user.id,
          categoryId: category.id,
        },
      });

      await tx.interviewQuestion.createMany({
        data: finalQuestions.map((question, index) => ({
          interviewId: createdInterview.id,
          questionId: question.id,
          orderIndex: index + 1,
          questionText: question.question,
          difficulty: question.difficulty,
        })),
      });

      return createdInterview;
    });
    console.log(finalQuestions);
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    console.error("[START_INTERVIEW_ERROR]", error);

    throw new AppError(
      "Failed to create interview",
      "INTERVIEW_CREATION_FAILED",
      500,
    );
  }

  redirect(interviewQuestionsPath(interveiw.id));
}
