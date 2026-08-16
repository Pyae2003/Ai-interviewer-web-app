"use server";

import { prisma } from "@/config";
import type { CategoryGroupType } from "@/generated/prisma/enums";
import { actionClient } from "@/lib/safe-action";
import { getSession } from "@/lib/get-Session";
import { AppError } from "@/middleware";

export type CategoryGroupListItem = {
  id: string;
  name: string;
  slug: string;
  type: CategoryGroupType;
  description: string | null;
  status: "ACTIVE" | "INACTIVE";
  categoryCount: number;
  createdAt: string;
  updatedAt: string;
};

export type GetAllCategoryGroupsResponse = {
  success: boolean;
  message: string;
  data: CategoryGroupListItem[];
};

export const getAllCategoryGroups = actionClient.action(
  async (): Promise<GetAllCategoryGroupsResponse> => {
    const session = await getSession();

    if (!session?.user?.id) {
      throw new AppError("Unauthorized", "UNAUTHORIZED", 401);
    }

    if (session.user.role !== "admin") {
      throw new AppError(
        "You do not have permission to access category groups.",
        "FORBIDDEN",
        403,
      );
    }

    try {
      const categoryGroups = await prisma.categoryGroup.findMany({
        select: {
          id: true,
          name: true,
          slug: true,
          type: true,
          description: true,
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

      const data: CategoryGroupListItem[] = categoryGroups.map((group) => ({
        id: group.id,
        name: group.name,
        slug: group.slug,
        type: group.type,
        description: group.description,
        status: group.isActive ? "ACTIVE" : "INACTIVE",
        categoryCount: group._count.categories,
        createdAt: group.createdAt.toISOString(),
        updatedAt: group.updatedAt.toISOString(),
      }));

      return {
        success: true,
        message: "Category groups fetched successfully.",
        data,
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
