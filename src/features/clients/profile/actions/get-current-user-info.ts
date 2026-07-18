"use server";

import { prisma } from "@/config";
import { getSession } from "@/lib/get-Session";
import { actionClient } from "@/lib/safe-action";
import { AppError } from "@/middleware";

type GetCurrentUserResponse = {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string | null;
    image?: string | null;
    email?: string;
  };
};

export const getCurrentUserInfo = actionClient.action(
  async (): Promise<GetCurrentUserResponse> => {
    try {
      // Authentication
      const session = await getSession();

      if (!session) {
        throw new AppError(
          "Unauthorized",
          "UNAUTHORIZED",
          401,
        );
      }

      // Database
      const user = await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      });

      if (!user) {
        throw new AppError(
          "User not found.",
          "USER_NOT_FOUND",
          404,
        );
      }

      return {
        success: true,
        message: "Current user fetched successfully.",
        data: user,
      };
    } catch (error) {
      console.error("[GET_CURRENT_USER_ERROR]", error);

      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError(
        "Unable to fetch current user.",
        "GET_CURRENT_USER_FAILED",
        500,
      );
    }
  },
);