"use server";

import { prisma } from "@/config";
import { AppError } from "@/middleware";
import { getQuestionByIdSchema } from "../schema/get-questionId-schema";

export const getQuestionWithId = async (questionId: string) => {
  const validatedId = getQuestionByIdSchema.safeParse({
    id : questionId,
  });

  try {
    const question = await prisma.question.findUnique({
      where: {
        id : validatedId.data?.id
      },
      select: {
        id: true,
        question: true,
        difficulty: true,
        category: {
          select: {
            id:true,
            name: true,
          },
        },
      },
    });

    if (!question) {
      throw new AppError("Question not found", "QUESTION_NOT_FOUND", 404);
    }

    return {
      success: true,
      data: question,
    };
  } catch (error) {
    // Known custom error
    if (error instanceof AppError) {
      throw error;
    }

    // Prisma known errors (optional but production useful)
    // Example: invalid UUID, DB error, etc.
    console.error("GET_QUESTION_BY_ID_ERROR", error);

    throw new AppError(
      "Failed to fetch question",
      "QUESTION_FETCH_FAILED",
      500,
    );
  }
};
