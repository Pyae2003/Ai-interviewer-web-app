"use server";

import { prisma } from "@/config";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";
import { AppError } from "@/middleware";

import { verifyOtpSchema } from "../schema/verify-otp.schema";

type VerifyOtpResponse = {
  success: boolean;
  message: string;
};

export const verifyOtp = actionClient
  .inputSchema(verifyOtpSchema)
  .action(async ({ parsedInput }): Promise<VerifyOtpResponse> => {
    const { email, otp } = parsedInput;

    try {
      // 1. Verify OTP through Better Auth
      const result = await auth.api.checkVerificationOTP({
        body: {
          email,
          otp,
          type: "email-verification",
        },
      });

      if (!result) {
        throw new AppError(
          "Unable to verify your email.",
          "OTP_VERIFICATION_FAILED",
          400,
        );
      }

      // 2. Find user
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
          emailVerified: true,
        },
      });

      if (!user) {
        throw new AppError(
          "User account not found.",
          "USER_NOT_FOUND",
          404,
        );
      }

      // 3. Update only if not already verified
      if (!user.emailVerified) {
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            emailVerified: true,
          },
        });
      }

      return {
        success: true,
        message: "Your email has been verified successfully.",
      };
    } catch (error: unknown) {
      console.error("[VERIFY_OTP_ERROR]", {
        email,
        code: error instanceof Error ? error.name : undefined,
        message: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
      });

      const code =
        typeof error === "object" &&
        error !== null &&
        "code" in error
          ? String(error.code)
          : undefined;

      const message =
        error instanceof Error
          ? error.message.toLowerCase()
          : String(error).toLowerCase();

      if (
        code === "OTP_EXPIRED" ||
        message.includes("expired")
      ) {
        throw new AppError(
          "Your verification code has expired. Please request a new one.",
          "OTP_EXPIRED",
          400,
        );
      }

      if (
        code === "INVALID_OTP" ||
        message.includes("invalid")
      ) {
        throw new AppError(
          "The verification code you entered is incorrect.",
          "INVALID_OTP",
          400,
        );
      }

      if (
        code === "RATE_LIMITED" ||
        message.includes("too many")
      ) {
        throw new AppError(
          "Too many verification attempts. Please wait before trying again.",
          "RATE_LIMITED",
          429,
        );
      }

      if (code === "USER_NOT_FOUND") {
        throw error;
      }

      if (
        error instanceof AppError
      ) {
        throw error;
      }

      throw new AppError(
        "Unable to verify your email at this time.",
        "OTP_VERIFICATION_FAILED",
        500,
      );
    }
  });