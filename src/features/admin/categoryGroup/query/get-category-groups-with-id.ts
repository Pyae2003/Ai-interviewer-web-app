"use server";

import { z } from "zod";

import { prisma } from "@/config";
import { getSession } from "@/lib/get-Session";
import { actionClient } from "@/lib/safe-action";
import { AppError } from "@/middleware";
import { getCategoryGroupByIdSchema } from "../schema/get-category-group-by-id";


export type GetCategoryGroupResponse = {
  success: boolean;
  data: {
    id: string;
    name: string;
    slug: string;
    type: string;
    description: string | null;
    icon: string | null;
    color: string | null;
    order: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
};

export const getCategoryGroupById = actionClient
  .inputSchema(getCategoryGroupByIdSchema)
  .action(
    async ({ parsedInput }): Promise<GetCategoryGroupResponse> => {
      const session = await getSession();

      if (!session?.user?.id) {
        throw new AppError(
          "Unauthorized",
          "UNAUTHORIZED",
          401,
        );
      }

      if (session.user.role !== "admin") {
        throw new AppError(
          "Forbidden",
          "FORBIDDEN",
          403,
        );
      }

      try {
        const categoryGroup = await prisma.categoryGroup.findUnique({
          where: {
            id: parsedInput.id,
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

            createdAt: true,
            updatedAt: true,
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
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new AppError(
            error.issues[0]?.message ??
              "Invalid category group id.",
            "INVALID_CATEGORY_GROUP_ID",
            400,
          );
        }

        if (error instanceof AppError) {
          throw error;
        }

        console.error(
          "[GET_CATEGORY_GROUP_BY_ID_ERROR]",
          error,
        );

        throw new AppError(
          "Failed to fetch category group.",
          "CATEGORY_GROUP_FETCH_FAILED",
          500,
        );
      }
    },
  );