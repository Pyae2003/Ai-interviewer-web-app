"use server";

import { prisma } from "@/config";
import { getSession } from "@/lib/get-Session";
import { AppError } from "@/middleware";

export type CategoryGroupSelectionResponse = {
  success: true;
  data: {
    id: string;
    name: string;
    slug: string;
    categories: {
      id: string;
      name: string;
      latestScore: number;
      interviews: number;
    }[];
  }[];
};

export async function getCategoryGroupSelection(): Promise<CategoryGroupSelectionResponse> {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new AppError("Unauthorized", "UNAUTHORIZED", 401);
  }

  try {
    const groups = await prisma.categoryGroup.findMany({
      where: {
        isActive: true,
      },

      orderBy: {
        order: "asc",
      },

      select: {
        id: true,
        name: true,
        slug: true,

        categories: {
          where: {
            isActive: true,
          },

          orderBy: {
            sortOrder: "asc",
          },

          select: {
            id: true,
            name: true,

            interviews: {
              where: {
                userId: session.user.id,
                status: "COMPLETED",
              },

              orderBy: {
                createdAt: "desc",
              },

              select: {
                score: true,
              },
            },
          },
        },
      },
    });

    const result = groups
      .map((group) => ({
        id: group.id,

        name: group.name,

        slug: group.slug,

        categories: group.categories
          .map((category) => ({
            id: category.id,

            name: category.name,

            latestScore: category.interviews[0]?.score ?? 0,

            interviews: category.interviews.length,
          }))
          .filter((category) => category.interviews > 0),
      }))
      .filter((group) => group.categories.length > 0);

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    console.error("[GET_CATEGORY_GROUP_SELECTION_ERROR]", error);

    throw new AppError(
      "Failed to fetch category groups.",
      "CATEGORY_GROUP_SELECTION_FAILED",
      500,
    );
  }
}
