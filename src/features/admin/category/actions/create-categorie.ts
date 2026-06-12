"use server";

import { prisma } from "@/config";
import { AppError } from "@/middleware";
import { actionClient } from "@/lib/safe-action";
import { createCategorySchema } from "../schema/create-categories.schema";


type CreateCategoryResponse = {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    isActive: boolean;
  };
};

export const createCategory = actionClient
  .inputSchema(createCategorySchema)
  .action(async ({ parsedInput }): Promise<CreateCategoryResponse> => {
    const { name, description, isActive, sortOrder } = parsedInput;

    try {
      const existingCategory = await prisma.category.findUnique({
        where: {
          name,
        },
        select: {
          id: true,
        },
      });

      if (existingCategory) {
        throw new AppError(
          "Category already exists",
          "CATEGORY_ALREADY_EXISTS",
          409,
        );
      }

      const category = await prisma.category.create({
        data: {
          name,
          description,
          isActive,
          sortOrder,
        },
        select: {
          id: true,
          name: true,
          isActive: true,
        },
      });

      return {
        success: true,
        message: "Category created successfully",
        data: category,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      console.error("CREATE_CATEGORY_ERROR", error);

      throw new AppError(
        "Failed to create category",
        "CATEGORY_CREATE_FAILED",
        500,
      );
    }
  });
