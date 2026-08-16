"use server";

import { prisma } from "@/config";
import { getSession } from "@/lib/get-Session";
import { AppError } from "@/middleware";

export const getAllCategories = async () => {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new AppError(
      "You must be signed in to view categories.",
      "UNAUTHORIZED",
      401,
    );
  }

  if (session.user.role !== "admin") {
    throw new AppError(
      "You do not have permission to view categories.",
      "FORBIDDEN",
      403,
    );
  }
  try {
    const categories = await prisma.category.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        description: true,
        isActive: true,
        sortOrder: true,
        createdAt: true,
        updatedAt: true,
        categoryGroup: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            questions: true,
            interviews : true
          },
        },
      },
      orderBy: {
        sortOrder: "asc",
      },
    });
    console.log(categories)

    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      description: category.description,
      groupName: category.categoryGroup!.name,
      questionCount: category._count.questions,
      interviewCount: category._count.interviews,
      isActive: category.isActive,
      updatedAt: category.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error("GET_ALL_CATEGORIES_ERROR", error);

    throw new AppError(
      "Failed to fetch categories",
      "CATEGORY_FETCH_FAILED",
      500,
    );
  }
};
