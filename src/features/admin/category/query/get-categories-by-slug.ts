"use server";

import { prisma } from "@/config";
import { AppError } from "@/middleware";
import { actionClient } from "@/lib/safe-action";
import { getCategoryGroupBySlugSchema } from "../schema/get-category-by-slug.schema";

export const getCategoryGroupBySlug = actionClient
  .inputSchema(getCategoryGroupBySlugSchema)
  .action(async ({ parsedInput }) => {
    const categoryGroup = await prisma.categoryGroup.findFirst({
      where: {
        slug: parsedInput.slug,
        isActive: true,
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
            description: true,
            isActive: true,
            sortOrder: true,
            createdAt: true,
            updatedAt: true,
            _count: {
              select: {
                questions: true,
                interviews: true,
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

    return {
      success: true,
      data: categoryGroup,
    };
  });
