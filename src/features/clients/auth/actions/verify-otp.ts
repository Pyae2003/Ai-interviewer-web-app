"use server";

import { actionClient } from "@/lib/safe-action";
import { auth } from "@/lib/auth";
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

      return {
        success: true,
        message: "Email verified successfully.",
      };
    } catch (error: any) {
      console.error("[VERIFY_OTP_ERROR]", {
        email,
        code: error?.code,
        message: error?.message,
        timestamp: new Date().toISOString(),
      });

      const code = error?.code;
      const message = String(error?.message ?? "").toLowerCase();

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

      throw new AppError(
        "Unable to verify your email at this time.",
        "OTP_VERIFICATION_FAILED",
        500,
      );
    }
  });