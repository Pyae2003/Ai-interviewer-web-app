"use server";

import { prisma } from "@/config";
import { AppError } from "@/middleware";
import { actionClient } from "@/lib/safe-action";

import { updateCategorySchema } from "../schema/update-categories.schema";

type UpdateCategoryResponse = {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    isActive: boolean;
  };
};

export const updateCategory = actionClient
  .inputSchema(updateCategorySchema)
  .action(async ({ parsedInput }): Promise<UpdateCategoryResponse> => {
    const { id, name, description, isActive, sortOrder , categoryGroupName } = parsedInput;

    try {
      const existingCategory = await prisma.category.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
        },
      });

      if (!existingCategory) {
        throw new AppError("Category not found", "CATEGORY_NOT_FOUND", 404);
      }

      if (name && name !== existingCategory.name) {
        const duplicateCategory = await prisma.category.findFirst({
          where: {
            name: {
              equals: name,
              mode: "insensitive",
            },
            NOT: {
              id,
            },
          },
          select: {
            id: true,
          },
        });

        if (duplicateCategory) {
          throw new AppError(
            "Category name already exists",
            "CATEGORY_ALREADY_EXISTS",
            409,
          );
        }
      }

      const updateData = Object.fromEntries(
        Object.entries({
          name,
          description,
          isActive,
          sortOrder,
        }).filter(([, value]) => value !== undefined),
      );

      const category = await prisma.category.update({
        where: {
          id,
        },
        data: updateData,
        select: {
          id: true,
          name: true,
          isActive: true,
        },
      });

      return {
        success: true,
        message: "Category updated successfully",
        data: category,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      console.error("UPDATE_CATEGORY_ERROR", error);

      throw new AppError(
        "Failed to update category",
        "CATEGORY_UPDATE_FAILED",
        500,
      );
    }
  });
