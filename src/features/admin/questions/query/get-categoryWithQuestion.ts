"use server";

import { prisma } from "@/config";
import { AppError } from "@/middleware";
import { getQuestionByIdSchema } from "../schema/get-questionId-schema";

// OPTIONAL: import auth helper if you have one
// import { getCurrentUser } from "@/lib/auth";

export const getCategoryWithQuestions = async (id: string) => {
  const validatedData = getQuestionByIdSchema.safeParse({
    id,
  });
  try {
    /**
     * 🔐 AUTH CHECK (enable in real production)
     */
    // const user = await getCurrentUser();
    // if (!user) {
    //   throw new AppError("Unauthorized", "UNAUTHORIZED", 401);
    // }

    const category = await prisma.category.findUnique({
      where: { id: validatedData.data?.id },
      select: {
        id: true,
        name: true,
        description: true,
        questions: {
          select: {
            id: true,
            question: true,
            difficulty: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: "asc",
          },

          /**
           * 🚀 PRODUCTION IMPROVEMENT (optional but recommended)
           * Prevent huge payloads
           */
          take: 50,
        },
      },
    });

    if (!category) {
      throw new AppError("Category not found", "CATEGORY_NOT_FOUND", 404);
    }

    return {
      success: true,
      data: category,
    };
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    console.error("GET_CATEGORY_WITH_QUESTIONS_ERROR", error);

    throw new AppError(
      "Failed to fetch category data",
      "CATEGORY_FETCH_FAILED",
      500,
    );
  }
};
