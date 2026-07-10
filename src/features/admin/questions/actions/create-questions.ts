"use server";

import { prisma } from "@/config";
import { actionClient } from "@/lib/safe-action";
import { AppError } from "@/middleware";

import { createQuestionSchema } from "../schema/create-questions-schema";
import { getSession } from "@/lib/get-Session";

type CreateQuestionResponse = {
  success: boolean;
  message: string;
  data?: {
    id: string;
    question: string;
    difficulty: string;
    categoryId: string;
  };
};

export const createQuestion = actionClient
  .inputSchema(createQuestionSchema)
  .action(async ({ parsedInput }): Promise<CreateQuestionResponse> => {
    const { categoryName, question, difficulty } = parsedInput;
    const session = await getSession();

    if (!session?.user) {
      throw new AppError("Unauthorized", "UNAUTHORIZED", 401);
    }

    if (session.user.banned) {
      throw new AppError("Account banned", "ACCOUNT_BANNED", 403);
    }

    if (session.user.role !== "admin") {
      throw new AppError("Forbidden", "FORBIDDEN", 403);
    }

    try {
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

      const existingQuestion = await prisma.question.findFirst({
        where: {
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

      if (existingQuestion) {
        throw new AppError(
          "Question already exists",
          "QUESTION_ALREADY_EXISTS",
          409,
        );
      }

      const createdQuestion = await prisma.question.create({
        data: {
          categoryId: category.id,
          question,
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
        message: "Question created successfully",
        data: createdQuestion,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      console.error("[CREATE_QUESTION_ERROR]", error);

      throw new AppError(
        "Failed to create question",
        "QUESTION_CREATE_FAILED",
        500,
      );
    }
  });
