"use server";

import { prisma } from "@/config";
import { getSession } from "@/lib/get-Session";
import { AppError } from "@/middleware";

import { getQuestionByIdSchema } from "../schema/get-questionId-schema";
import { QuestionDashboardItem } from "../components/questions-dashboard";

export type GetQuestionByIdResponse = {
  success: boolean;
  message: string;
  data: QuestionDashboardItem;
};

export const getQuestionById = async (
  questionId: string,
): Promise<GetQuestionByIdResponse> => {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new AppError(
      "You must be signed in to view this question.",
      "UNAUTHORIZED",
      401,
    );
  }

  if (session.user.role !== "admin") {
    throw new AppError(
      "You do not have permission to view this question.",
      "FORBIDDEN",
      403,
    );
  }

  const validationResult = getQuestionByIdSchema.safeParse({
    id: questionId,
  });

  if (!validationResult.success) {
    throw new AppError(
      validationResult.error.issues[0]?.message ?? "Invalid question ID.",
      "INVALID_QUESTION_ID",
      400,
    );
  }

  try {
    const question = await prisma.question.findUnique({
      where: {
        id: validationResult.data.id,
      },

      select: {
        id: true,
        question: true,
        difficulty: true,
        createdAt: true,
        updatedAt: true,
        category: {
          select: {
            id: true,
            name: true,
            categoryGroup: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!question) {
      throw new AppError("Question not found.", "QUESTION_NOT_FOUND", 404);
    }

    const data: QuestionDashboardItem = {
      id: question.id,
      question: question.question,
      difficulty: question.difficulty,
      categoryId: question.category.id,
      categoryName: question.category.name,
      createdAt: question.createdAt.toISOString(),
      updatedAt: question.updatedAt.toISOString(),
      categoryGroupName: question.category.categoryGroup!.name,
    };

    return {
      success: true,
      message: "Question fetched successfully.",
      data,
    };
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    console.error("[GET_QUESTION_BY_ID_ERROR]", error);

    throw new AppError(
      "Failed to fetch question.",
      "QUESTION_FETCH_FAILED",
      500,
    );
  }
};
