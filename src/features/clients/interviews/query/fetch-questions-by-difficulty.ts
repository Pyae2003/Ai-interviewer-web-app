import { Difficulty } from "@/generated/prisma/client";

import { prisma } from "@/config";
import { AppError } from "@/middleware";

import { getCategoryByIdSchema } from "@/features/admin/category/schema/get-categoryId.schema";

type FetchQuestionsByDifficultyResponse = {
  success: boolean;
  total: number;
  data: {
    id: string;
    question: string;
    difficulty: Difficulty;
  }[];
};

export async function fetchQuestionsByDifficulty(
  categoryId: string,
  difficulty: Difficulty,
): Promise<FetchQuestionsByDifficultyResponse> {
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

    const questions = await prisma.question.findMany({
      where: {
        categoryId: category.id,
        difficulty,
      },

      select: {
        id: true,
        question: true,
        difficulty: true,
      },

      orderBy: {
        createdAt: "asc",
      },

      take: 50,
    });

    return {
      success: true,
      total: questions.length,
      data: questions,
    };
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    console.error("[FETCH_QUESTIONS_BY_DIFFICULTY_ERROR]", {
      categoryId,
      difficulty,
      error,
    });

    throw new AppError(
      "Failed to fetch questions",
      "QUESTION_FETCH_FAILED",
      500,
    );
  }
}
