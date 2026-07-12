"use server";

import { actionClient } from "@/lib/safe-action";
import { auth } from "@/lib/auth";

import { requestResetPasswordSchema } from "../schema/request-password-reset.schema";

type RequestPasswordResetResponse = {
  success: boolean;
  message: string;
};

export const requestPasswordReset = actionClient
  .inputSchema(requestResetPasswordSchema)
  .action(async ({ parsedInput }): Promise<RequestPasswordResetResponse> => {
    const { email } = parsedInput;

    try {
      await auth.api.requestPasswordReset({
        body: {
          email,
          redirectTo: `${process.env.BETTER_AUTH_URL}/change-password`,
        },
      });

      return {
        success: true,
        message:
          "If an account exists with this email, a password reset link has been sent.",
      };
    } catch (error) {
      console.error("[REQUEST_PASSWORD_RESET]", {
        email,
        error,
        timestamp: new Date().toISOString(),
      });
      return {
        success: true,
        message:
          "If an account exists with this email, a password reset link has been sent.",
      };
    }
  });
