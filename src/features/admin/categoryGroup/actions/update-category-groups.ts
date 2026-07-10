"use server";

import { prisma } from "@/config";
import { getSession } from "@/lib/get-Session";
import { actionClient } from "@/lib/safe-action";
import { AppError } from "@/middleware";
import { updateCategoryGroupsSchema } from "../schema/update-category-groups.schema";

type UpdateCategoryGroupResponse = {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    slug: string;
    type: string;
    isActive: boolean;
    updatedAt: Date;
  };
};

export const updateCategoryGroup = actionClient
  .inputSchema(updateCategoryGroupsSchema)
  .action(async ({ parsedInput }): Promise<UpdateCategoryGroupResponse> => {
    const session = await getSession();

    if (!session?.user?.id) {
      throw new AppError("Unauthorized", "UNAUTHORIZED", 401);
    }

    if (session.user.role !== "admin") {
      throw new AppError("Forbidden", "FORBIDDEN", 403);
    }

    const id = parsedInput.id;

    try {
      const existing = await prisma.categoryGroup.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          slug: true,
          type: true,
          description: true,
          icon: true,
          color: true,
          order: true,
          isActive: true,
        },
      });

      if (!existing) {
        throw new AppError(
          "Category group not found.",
          "CATEGORY_GROUP_NOT_FOUND",
          404,
        );
      }

      const duplicate = await prisma.categoryGroup.findFirst({
        where: {
          id: {
            not: id,
          },
          OR: [
            {
              name: {
                equals: parsedInput.name,
                mode: "insensitive",
              },
            },
            {
              slug: parsedInput.slug,
            },
          ],
        },
        select: {
          id: true,
        },
      });

      if (duplicate) {
        throw new AppError(
          "Category group name or slug already exists.",
          "CATEGORY_GROUP_ALREADY_EXISTS",
          409,
        );
      }

      const nothingChanged =
        existing.name === parsedInput.name &&
        existing.slug === parsedInput.slug &&
        existing.type === parsedInput.type &&
        existing.description === parsedInput.description &&
        existing.icon === parsedInput.icon &&
        existing.color === parsedInput.color &&
        existing.order === parsedInput.order &&
        existing.isActive === parsedInput.isActive;

      if (nothingChanged) {
        return {
          success: true,
          message: "No changes detected.",
          data: {
            id: existing.id,
            name: existing.name,
            slug: existing.slug,
            type: existing.type,
            isActive: existing.isActive,
            updatedAt: new Date(),
          },
        };
      }

      const updatedCategoryGroup = await prisma.$transaction(async (tx) => {
        return tx.categoryGroup.update({
          where: {
            id,
          },
          data: {
            name: parsedInput.name,
            slug: parsedInput.slug,
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
            updatedAt: true,
          },
        });
      });

      return {
        success: true,
        message: "Category group updated successfully.",
        data: updatedCategoryGroup,
      };
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      }

      if (error?.code === "P2002") {
        throw new AppError(
          "Category group already exists.",
          "CATEGORY_GROUP_ALREADY_EXISTS",
          409,
        );
      }

      console.error("[UPDATE_CATEGORY_GROUP_ERROR]", error);

      throw new AppError(
        "Failed to update category group.",
        "CATEGORY_GROUP_UPDATE_FAILED",
        500,
      );
    }
  });
