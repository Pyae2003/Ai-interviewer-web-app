"use server";

import { prisma } from "@/config";
import { getSession } from "@/lib/get-Session";
import { AppError } from "@/middleware";

export type TopCategory = {
  categoryId: string;
  categoryName: string;
  totalInterviews: number;
  percentage : number;
};

export async function getTopCategoriesFn(): Promise<{
  success: boolean;
  data: TopCategory[];
}> {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new AppError("Unauthorized", "UNAUTHORIZED", 401);
  }

  if (session.user.role !== "admin") {
    throw new AppError("Forbidden", "FORBIDDEN", 403);
  }

  try {
    const categories = await prisma.category.findMany({
      where: {
        isActive: true,
      },

      select: {
        id: true,
        name: true,

        _count: {
          select: {
            interviews: true,
          },
        },
      },

      orderBy: {
        interviews: {
          _count: "desc",
        },
      },

      take: 5,
    });

    const topCategories = categories.map((category) => ({
      categoryId: category.id,
      categoryName: category.name,
      totalInterviews: category._count.interviews,
    }));

    const allCategoriesTotalInterviews = topCategories.reduce(
      (sum, category) => sum + category.totalInterviews,
      0,
    );

    const result = topCategories.map((category) => ({
      ...category,
      percentage: Math.round(
        (category.totalInterviews / allCategoriesTotalInterviews) * 100,
      ),
    }));

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("[TOP_CATEGORIES_ERROR]", error);

    throw new AppError(
      "Failed to load top categories",
      "TOP_CATEGORIES_FAILED",
      500,
    );
  }
}
