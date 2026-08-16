"use server";

import { z } from "zod";

import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";
import { AppError } from "@/middleware";

const resendOtpSchema = z.object({
  email: z
    .string()
    .trim()
    .email("A valid email address is required."),
});

export const resendVerificationOtp = actionClient
  .inputSchema(resendOtpSchema)
  .action(async ({ parsedInput }) => {
    try {
      await auth.api.sendVerificationOTP({
        body: {
          email: parsedInput.email,
          type: "email-verification",
        },
      });

      return {
        success: true,
        message: "A new verification code has been sent.",
      };
    } catch (error) {
      console.error(
        "[RESEND_VERIFICATION_OTP_ERROR]",
        error instanceof Error
          ? error.message
          : "Unknown resend error",
      );

      throw new AppError(
        "Unable to send a new verification code.",
        "OTP_RESEND_FAILED",
        500,
      );
    }
  });