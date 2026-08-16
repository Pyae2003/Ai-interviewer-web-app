"use server";

import { prisma } from "@/config";
import { Difficulty } from "@/generated/prisma/enums";
import { getSession } from "@/lib/get-Session";
import { AppError } from "@/middleware";
import { QuestionDashboardItem } from "../components/questions-dashboard";

export type GetAllQuestionsResponse = {
  success: boolean;
  message: string;
  data: QuestionDashboardItem[];
};

export const getAllQuestions = async (): Promise<GetAllQuestionsResponse> => {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new AppError(
      "You must be signed in to view questions.",
      "UNAUTHORIZED",
      401,
    );
  }

  if (session.user.role !== "admin") {
    throw new AppError(
      "You do not have permission to view questions.",
      "FORBIDDEN",
      403,
    );
  }

  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,

        questions: {
          select: {
            id: true,
            question: true,
            difficulty: true,
            createdAt: true,
            updatedAt: true,
          },

          orderBy: {
            createdAt: "desc",
          },
        },
      },

      orderBy: {
        sortOrder: "asc",
      },
    });

    const questions: QuestionDashboardItem[] = categories.flatMap((category) =>
      category.questions.map((question) => ({
        id: question.id,
        question: question.question,
        difficulty: question.difficulty as Difficulty,
        categoryId: category.id,
        categoryName: category.name,
        createdAt: question.createdAt.toISOString(),
        updatedAt: question.updatedAt.toISOString(),
      })),
    );

    return {
      success: true,
      message: "Questions fetched successfully.",
      data: questions,
    };
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    console.error("[GET_ALL_QUESTIONS_ERROR]", error);

    throw new AppError(
      "Failed to fetch questions.",
      "QUESTIONS_FETCH_FAILED",
      500,
    );
  }
};
