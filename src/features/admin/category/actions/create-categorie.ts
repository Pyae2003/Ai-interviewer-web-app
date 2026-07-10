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
    const { name, description, isActive, sortOrder, categoryGroupName } =
      parsedInput;

    try {
      const categoryGroup = await prisma.categoryGroup.findFirst({
        where: {
          name: categoryGroupName,
        },
        select: {
          id: true,
        },
      });

      if (!categoryGroup) {
        throw new AppError(
          "Category group not found",
          "CATEGORY_GROUP_NOT_FOUND",
          404,
        );
      }
      const existingCategory = await prisma.category.findFirst({
        where: {
          categoryGroupId: categoryGroup.id,
          name: {
            equals: name,
            mode: "insensitive",
          },
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
          categoryGroupId: categoryGroup.id,
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
