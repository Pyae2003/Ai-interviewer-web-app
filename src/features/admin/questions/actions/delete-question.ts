"use server";

import { z } from "zod";
import { prisma } from "@/config";
import { AppError } from "@/middleware";
import { revalidatePath } from "next/cache";
import { questionDashboardWithCategoryNamePath } from "@/constants/route";
import { deleteQuestionSchema } from "../schema/delete-question-schema";

export const deleteQuestion = async (id: string) => {
  try {
    /**
     * 1. Validate input
     */
    const { id: questionId } = deleteQuestionSchema.parse({ id });

    /**
     * 2. (Optional but recommended) AUTH CHECK
     */
    // const user = await getCurrentUser();
    // if (!user) {
    //   throw new AppError("Unauthorized", "UNAUTHORIZED", 401);
    // }

    /**
     * 3. Check existence
     */
    const question = await prisma.question.findUnique({
      where: { id: questionId },
      select: {
        id: true,
        categoryId: true,
      },
    });

    if (!question) {
      throw new AppError(
        "Question not found",
        "QUESTION_NOT_FOUND",
        404
      );
    }

    /**
     * 4. Delete operation
     */
    await prisma.question.delete({
      where: { id: questionId },
    });

    /**
     * 5. Revalidate correct path (IMPORTANT FIX)
     */
    revalidatePath(
      questionDashboardWithCategoryNamePath(question.categoryId)
    );

  } catch (error) {
    /**
     * 6. Zod validation error
     */
    if (error instanceof z.ZodError) {
      throw new AppError(
        error.issues[0]?.message ?? "Invalid question ID",
        "INVALID_QUESTION_ID",
        400
      );
    }

    /**
     * 7. Known App error
     */
    if (error instanceof AppError) {
      throw error;
    }

    /**
     * 8. Unknown error
     */
    console.error("DELETE_QUESTION_ERROR", error);

    throw new AppError(
      "Failed to delete question",
      "QUESTION_DELETE_FAILED",
      500
    );
  }
};