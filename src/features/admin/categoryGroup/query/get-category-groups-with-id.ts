"use server";

import { prisma } from "@/config";
import type { CategoryGroupType } from "@/generated/prisma/enums";
import { getSession } from "@/lib/get-Session";
import { actionClient } from "@/lib/safe-action";
import { AppError } from "@/middleware";

import { getCategoryGroupByIdSchema } from "../schema/get-category-group-by-id";

export type CategoryGroupDetail = {
  id: string;
  name: string;
  slug: string;
  type: CategoryGroupType;
  description: string | null;
  icon: string | null;
  color: string | null;
  order: number;
  isActive: boolean;
  categoryCount: number;
  questionCount: number;
  createdAt: string;
  updatedAt: string;
};

export type GetCategoryGroupResponse = {
  success: boolean;
  message: string;
  data: CategoryGroupDetail;
};

export const getCategoryGroupById = actionClient
  .inputSchema(getCategoryGroupByIdSchema)
  .action(async ({ parsedInput }): Promise<GetCategoryGroupResponse> => {
    const session = await getSession();

    if (!session?.user?.id) {
      throw new AppError(
        "You must be signed in to view this category group.",
        "UNAUTHORIZED",
        401,
      );
    }

    if (session.user.role !== "admin") {
      throw new AppError(
        "You do not have permission to view this category group.",
        "FORBIDDEN",
        403,
      );
    }

    try {
      const categoryGroup = await prisma.categoryGroup.findUnique({
        where: {
          id: parsedInput.id,
        },

        select: {
          id: true,
          name: true,
          slug: true,
          type: true,
          description: true,
          icon: true,
          color: true,
          order: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,

          _count: {
            select: {
              categories: true,
            },
          },

          categories: {
            select: {
              _count: {
                select: {
                  questions: true,
                },
              },
            },
          },
        },
      });

      if (!categoryGroup) {
        throw new AppError(
          "Category group not found.",
          "CATEGORY_GROUP_NOT_FOUND",
          404,
        );
      }

      const questionCount = categoryGroup.categories.reduce(
        (total, category) => total + category._count.questions,
        0,
      );

      const data: CategoryGroupDetail = {
        id: categoryGroup.id,
        name: categoryGroup.name,
        slug: categoryGroup.slug,
        type: categoryGroup.type,
        description: categoryGroup.description,
        icon: categoryGroup.icon,
        color: categoryGroup.color,
        order: categoryGroup.order,
        isActive: categoryGroup.isActive,
        categoryCount: categoryGroup._count.categories,
        questionCount,
        createdAt: categoryGroup.createdAt.toISOString(),
        updatedAt: categoryGroup.updatedAt.toISOString(),
      };

      return {
        success: true,
        message: "Category group fetched successfully.",
        data,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      console.error("[GET_CATEGORY_GROUP_BY_ID_ERROR]", error);

      throw new AppError(
        "Failed to fetch category group.",
        "CATEGORY_GROUP_FETCH_FAILED",
        500,
      );
    }
  });