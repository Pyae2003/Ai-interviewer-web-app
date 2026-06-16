"use server";

import { prisma } from "@/config";
import { AppError } from "@/middleware";

export const getAllCategories = async () => {
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
        _count: {
          select: {
            questions: true,
          },
        },
      },
      orderBy: {
        sortOrder: "asc",
      },
    });

    return categories;
  } catch (error) {
    console.error("GET_ALL_CATEGORIES_ERROR", error);

    throw new AppError(
      "Failed to fetch categories",
      "CATEGORY_FETCH_FAILED",
      500,
    );
  }
};
