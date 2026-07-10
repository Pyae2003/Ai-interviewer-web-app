"use server";

import { actionClient } from "@/lib/safe-action";
import { auth } from "@/lib/auth";
import { AppError } from "@/middleware";

import { changePasswordSchema } from "../schema/change-password.schema";

type ChangePasswordResponse = {
  success: true;
  message: string;
};

export const changePassword = actionClient
  .inputSchema(changePasswordSchema)
  .action(async ({ parsedInput }): Promise<ChangePasswordResponse> => {
    const token = parsedInput.token.trim();
    const newPassword = parsedInput.newPassword.trim();

    try {
      if (!token) {
        throw new AppError(
          "Reset token is missing.",
          "RESET_TOKEN_MISSING",
          400,
        );
      }

      await auth.api.resetPassword({
        body: {
          token,
          newPassword,
        },
      });

      return {
        success: true,
        message:
          "Your password has been reset successfully. You can now sign in with your new password.",
      };
    } catch (error: any) {
      console.error("[RESET_PASSWORD_ERROR]", {
        code: error?.code,
        message: error?.message,
        cause: error?.cause,
        timestamp: new Date().toISOString(),
      });

      if (
        error?.message?.toLowerCase().includes("token") ||
        error?.code === "INVALID_TOKEN"
      ) {
        throw new AppError(
          "This password reset link is invalid or has expired.",
          "INVALID_RESET_TOKEN",
          400,
        );
      }

      throw new AppError(
        "Unable to reset your password. Please request a new password reset link and try again.",
        "RESET_PASSWORD_FAILED",
        500,
      );
    }
  });
