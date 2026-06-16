"use server";

import { prisma } from "@/config";
import { actionClient } from "@/lib/safe-action";
import { AppError } from "@/middleware";
import { updateQuestionSchema } from "../schema/edit-questions-schema";

type UpdateQuestionResponse = {
  success: boolean;
  message: string;
  data?: {
    id: string;
    question: string;
    difficulty: string;
    categoryId: string;
  };
};

export const updateQuestion = actionClient
  .inputSchema(updateQuestionSchema)
  .action(async ({ parsedInput }): Promise<UpdateQuestionResponse> => {
    const { id, categoryName, question, difficulty } = parsedInput;

    try {
      // 1. Check Question Exists
      const existingQuestion = await prisma.question.findUnique({
        where: { id },
        select: {
          id: true,
          categoryId: true,
        },
      });

      if (!existingQuestion) {
        throw new AppError("Question not found", "QUESTION_NOT_FOUND", 404);
      }

      // 2. Find Category
      const category = await prisma.category.findFirst({
        where: {
          name: categoryName,
        },
        select: {
          id: true,
        },
      });

      if (!category) {
        throw new AppError("Category not found", "CATEGORY_NOT_FOUND", 404);
      }

      // 3. Check Duplicate Question
      const duplicateQuestion = await prisma.question.findFirst({
        where: {
          id: {
            not: id, // exclude current question
          },
          categoryId: category.id,
          question: {
            equals: question,
            mode: "insensitive",
          },
        },
        select: {
          id: true,
        },
      });

      if (duplicateQuestion) {
        throw new AppError(
          "Question already exists in this category",
          "QUESTION_ALREADY_EXISTS",
          409,
        );
      }

      // 4. Update Question
      const updatedQuestion = await prisma.question.update({
        where: { id },
        data: {
          categoryId: category.id,
          question: question,
          difficulty,
        },
        select: {
          id: true,
          question: true,
          difficulty: true,
          categoryId: true,
        },
      });

      return {
        success: true,
        message: "Question updated successfully",
        data: updatedQuestion,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      console.error("[UPDATE_QUESTION_ERROR]", error);

      throw new AppError(
        "Failed to update question",
        "QUESTION_UPDATE_FAILED",
        500,
      );
    }
  });
