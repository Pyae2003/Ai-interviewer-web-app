"use server";

import { prisma } from "@/config";
import { getSession } from "@/lib/get-Session";
import { AppError } from "@/middleware";
import { revalidatePath } from "next/cache";

import { questionsDashboardPath } from "@/constants/route";
import { deleteQuestionSchema } from "../schema/delete-question-schema";


export const deleteQuestion = async (
  id: string,
): Promise<void> => {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new AppError(
      "You must be signed in to delete a question.",
      "UNAUTHORIZED",
      401,
    );
  }

  if (session.user.role !== "admin") {
    throw new AppError(
      "You do not have permission to delete questions.",
      "FORBIDDEN",
      403,
    );
  }

  const validationResult = deleteQuestionSchema.safeParse({ id });

  if (!validationResult.success) {
    throw new AppError(
      validationResult.error.issues[0]?.message ??
        "Invalid question ID.",
      "INVALID_QUESTION_ID",
      400,
    );
  }

  const questionId = validationResult.data.id;

  try {
    const question = await prisma.question.findUnique({
      where: {
        id: questionId,
      },

      select: {
        id: true,
      },
    });

    if (!question) {
      throw new AppError(
        "Question not found.",
        "QUESTION_NOT_FOUND",
        404,
      );
    }

    await prisma.question.delete({
      where: {
        id: questionId,
      },
    });

    revalidatePath(questionsDashboardPath);

  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    console.error("[DELETE_QUESTION_ERROR]", error);

    throw new AppError(
      "Failed to delete question.",
      "QUESTION_DELETE_FAILED",
      500,
    );
  }
};