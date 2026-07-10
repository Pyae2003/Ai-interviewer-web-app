"use server";

import { prisma } from "@/config";
import { actionClient } from "@/lib/safe-action";
import { getSession } from "@/lib/get-Session";
import { AppError } from "@/middleware";
import { createCategoryGroupSchema } from "../schema/create-category-groups.schema";

type CreateCategoryGroupResponse = {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    slug: string;
    type: string;
    isActive: boolean;
  };
};

export const createCategoryGroup = actionClient
  .inputSchema(createCategoryGroupSchema)
  .action(async ({ parsedInput }): Promise<CreateCategoryGroupResponse> => {
    const session = await getSession();

    if (!session?.user?.id) {
      throw new AppError("Unauthorized", "UNAUTHORIZED", 401);
    }

    if (session.user.role !== "admin") {
      throw new AppError("Forbidden", "FORBIDDEN", 403);
    }

    const name = parsedInput.name.trim();

    const slug = parsedInput.slug.trim().toLowerCase();

    try {
      const exists = await prisma.categoryGroup.findFirst({
        where: {
          OR: [
            {
              name: {
                equals: name,
                mode: "insensitive",
              },
            },
            {
              slug,
            },
          ],
        },
        select: {
          id: true,
        },
      });

      if (exists) {
        throw new AppError(
          "Category group already exists.",
          "CATEGORY_GROUP_ALREADY_EXISTS",
          409,
        );
      }

      const categoryGroup = await prisma.$transaction(async (tx) => {
        return tx.categoryGroup.create({
          data: {
            name,
            slug,

            type: parsedInput.type,

            description: parsedInput.description,

            icon: parsedInput.icon,

            color: parsedInput.color,

            order: parsedInput.order,

            isActive: parsedInput.isActive,
          },

          select: {
            id: true,
            name: true,
            slug: true,
            type: true,
            isActive: true,
          },
        });
      });

      return {
        success: true,
        message: "Category group created successfully.",
        data: categoryGroup,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      console.error("[CREATE_CATEGORY_GROUP_ERROR]", error);

      throw new AppError(
        "Failed to create category group.",
        "CATEGORY_GROUP_CREATE_FAILED",
        500,
      );
    }
  });
