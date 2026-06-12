"use server"
import { z } from "zod";

import { prisma } from "@/config";
import { AppError } from "@/middleware";
import { deleteCategorySchema } from "../schema/delete-categories.schema";
import { revalidatePath } from "next/cache";
import { categoriesdashboardPath } from "@/constants/route";



export const deleteCategory = async (
  id: string,
)=> {
  try {
    const validatedData = deleteCategorySchema.parse({
      id,
    });

    const existingCategory = await prisma.category.findUnique({
      where: {
        id: validatedData.id,
      },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            questions: true,
            interviews: true,
          },
        },
      },
    });

    if (!existingCategory) {
      throw new AppError("Category not found", "CATEGORY_NOT_FOUND", 404);
    }

    const hasDependencies =
      existingCategory._count.questions > 0 ||
      existingCategory._count.interviews > 0;

    if (hasDependencies) {
      throw new AppError(
        "Cannot delete category because it is being used by interviews or questions",
        "CATEGORY_IN_USE",
        409,
      );
    }

    await prisma.category.delete({
      where: {
        id: validatedData.id,
      },
    });

    revalidatePath(categoriesdashboardPath);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new AppError(
        error.issues[0]?.message ?? "Invalid category ID",
        "INVALID_CATEGORY_ID",
        400,
      );
    }

    if (error instanceof AppError) {
      throw error;
    }

    console.error("DELETE_CATEGORY_ERROR", error);

    throw new AppError(
      "Failed to delete category",
      "CATEGORY_DELETE_FAILED",
      500,
    );
  }
};
