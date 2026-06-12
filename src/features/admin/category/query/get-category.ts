"use server";

import { z } from "zod";

import { prisma } from "@/config";
import { AppError } from "@/middleware";
import { actionClient } from "@/lib/safe-action";
import { getCategoryByIdSchema } from "../schema/get-categoryId.schema";

export const getCategoryById = actionClient
  .inputSchema(getCategoryByIdSchema)
  .action(async ({ parsedInput }) => {
    const { id } = parsedInput;
    try {
      const category = await prisma.category.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          description: true,
          isActive: true,
          sortOrder: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!category) {
        throw new AppError("Category not found", "CATEGORY_NOT_FOUND", 404);
      }

      if (!category.isActive) {
        throw new AppError("Category is inactive", "CATEGORY_INACTIVE", 403);
      }

      return category;
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new AppError(
          error.issues[0]?.message ?? "Invalid category id",
          "INVALID_CATEGORY_ID",
          400,
        );
      }

      if (error instanceof AppError) {
        throw error;
      }

      console.error("GET_CATEGORY_BY_ID_ERROR", error);

      throw new AppError(
        "Failed to fetch category",
        "CATEGORY_FETCH_FAILED",
        500,
      );
    }
  });
