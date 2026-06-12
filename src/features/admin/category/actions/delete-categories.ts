"use server";

import { prisma } from "@/config";
import { AppError } from "@/middleware";

export const deleteAllCategories = async () => {
  try {
    const categories = await prisma.category.deleteMany({
     
    });

    return categories;
  } catch (error) {
    console.error("GET_ALL_CATEGORIES_ERROR", error);

    throw new AppError(
      "Failed to fetch categories",
      "CATEGORY_FETCH_FAILED",
      500
    );
  }
};