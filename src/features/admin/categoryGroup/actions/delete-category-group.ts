"use server";

import { prisma } from "@/config";
import { getSession } from "@/lib/get-Session";
import { actionClient } from "@/lib/safe-action";
import { AppError } from "@/middleware";
import { getCategoryGroupByIdSchema } from "../schema/get-category-group-by-id";


type DeleteCategoryGroupResponse = {
  success: boolean;
  message: string;
};

export const deleteCategoryGroup = actionClient
  .inputSchema(getCategoryGroupByIdSchema)
  .action(async ({ parsedInput }): Promise<DeleteCategoryGroupResponse> => {
    const session = await getSession();

    if (!session?.user?.id) {
      throw new AppError("Unauthorized", "UNAUTHORIZED", 401);
    }

    if (session.user.role !== "admin") {
      throw new AppError("Forbidden", "FORBIDDEN", 403);
    }

    try {
      const categoryGroup = await prisma.categoryGroup.findUnique({
        where: {
          id: parsedInput.id,
        },
        select: {
          id: true,
          name: true,
          _count: {
            select: {
              categories: true,
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

      if (categoryGroup._count.categories > 0) {
        throw new AppError(
          "Cannot delete a category group that still contains categories.",
          "CATEGORY_GROUP_NOT_EMPTY",
          409,
        );
      }

      await prisma.$transaction(async (tx) => {
        await tx.categoryGroup.delete({
          where: {
            id: categoryGroup.id,
          },
        });
      });

      return {
        success: true,
        message: "Category group deleted successfully.",
      };
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      };
      
      if (error?.code === "P2003") {
        throw new AppError(
          "This category group is being used and cannot be deleted.",
          "CATEGORY_GROUP_IN_USE",
          409,
        );
      }

      console.error("[DELETE_CATEGORY_GROUP_ERROR]", error);

      throw new AppError(
        "Failed to delete category group.",
        "CATEGORY_GROUP_DELETE_FAILED",
        500,
      );
    }
  });