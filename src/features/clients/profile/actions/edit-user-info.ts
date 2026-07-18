"use server";

import { actionClient } from "@/lib/safe-action";
import { AppError } from "@/middleware";
import { editProfileSchema } from "../schema/edit-profile.schema";
import { prisma } from "@/config";

type UpdateProfileResponse = {
  success: boolean;
  message: string;
};

export const editUserInfo = actionClient
  .inputSchema(editProfileSchema)
  .action(async ({ parsedInput }): Promise<UpdateProfileResponse> => {
    const { id, name, image } = parsedInput;

    try {
      const existingUser = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!existingUser) {
        throw new AppError(
          "User not found.",
          "USER_NOT_FOUND",
          404,
        );
      }

      await prisma.user.update({
        where: {
          id,
        },
        data: {
          name,
          image: image ?? existingUser.image,
        },
      });

      return {
        success: true,
        message: "Profile updated successfully.",
      };
    } catch (error) {
      console.error("[UPDATE_PROFILE_ERROR]", error);

      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError(
        "Unable to update profile.",
        "UPDATE_PROFILE_FAILED",
        500,
      );
    }
  });