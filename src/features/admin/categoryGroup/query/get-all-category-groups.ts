"use server";

import { prisma } from "@/config";
import { actionClient } from "@/lib/safe-action";
import { getSession } from "@/lib/get-Session";
import { AppError } from "@/middleware";
import { CategoryGroupType } from "@/generated/prisma/enums";

export type GetAllCategoryGroupsResponse = {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    slug: string;
    type: CategoryGroupType;
    description: string | null;
    icon: string | null;
    color: string | null;
    order: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    categoryCount: number;
  }[];
};

export const getAllCategoryGroups = actionClient.action(
  async (): Promise<GetAllCategoryGroupsResponse> => {
    const session = await getSession();

    if (!session?.user?.id) {
      throw new AppError("Unauthorized", "UNAUTHORIZED", 401);
    }

    try {
      const categoryGroups = await prisma.categoryGroup.findMany({
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
        },

        orderBy: [
          {
            order: "asc",
          },
          {
            createdAt: "desc",
          },
        ],
      });

      return {
        success: true,
        message: "Category groups fetched successfully.",
        data: categoryGroups.map((group) => ({
          id: group.id,
          name: group.name,
          slug: group.slug,
          type: group.type,
          description: group.description,
          icon: group.icon,
          color: group.color,
          order: group.order,
          isActive: group.isActive,
          createdAt: group.createdAt,
          updatedAt: group.updatedAt,
          categoryCount: group._count.categories,
        })),
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      console.error("[GET_ALL_CATEGORY_GROUPS_ERROR]", error);

      throw new AppError(
        "Failed to fetch category groups.",
        "CATEGORY_GROUP_FETCH_FAILED",
        500,
      );
    }
  },
);
