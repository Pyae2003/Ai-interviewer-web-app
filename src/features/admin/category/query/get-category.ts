"use server";

import { z } from "zod";

import { prisma } from "@/config";
import { AppError } from "@/middleware";
import { actionClient } from "@/lib/safe-action";
import { getCategoryByIdSchema } from "../schema/get-categoryId.schema";
import { getSession } from "@/lib/get-Session";
import { CategoryDashboardItem } from "../components/dashboard-categories";

export const getCategoryById = actionClient
  .inputSchema(getCategoryByIdSchema)
  .action(async ({ parsedInput }) => {
    const { id } = parsedInput;
    const session = await getSession();

      if (!session?.user?.id) {
        throw new AppError(
          "You must be signed in to view this category.",
          "UNAUTHORIZED",
          401,
        );
      }

      if (session.user.role !== "admin") {
        throw new AppError(
          "You do not have permission to view this category.",
          "FORBIDDEN",
          403,
        );
      }

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
          categoryGroup : {
            select : {
              id : true,
              name : true,
            }
          },
           _count: {
              select: {
                questions: true,
                interviews: true,
              },
            },
        },
      });

      if (!category) {
        throw new AppError("Category not found", "CATEGORY_NOT_FOUND", 404);
      }

      if (!category.isActive) {
        throw new AppError("Category is inactive", "CATEGORY_INACTIVE", 403);
      }

          const data: CategoryDashboardItem = {
          id: category.id,
          name: category.name,
          description: category.description,
          groupName: category.categoryGroup!.name,
          questionCount: category._count.questions,
          interviewCount: category._count.interviews,
          sortOrder: category.sortOrder,
          isActive: category.isActive,
          createdAt: category.createdAt.toISOString(),
          updatedAt: category.updatedAt.toISOString(),
        };

        return {
          success: true,
          message: "Category fetched successfully.",
          data,
        };
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
