"use server";

import { actionClient } from "@/lib/safe-action";
import { auth } from "@/lib/auth";
import { prisma } from "@/config";
import { AppError } from "@/middleware";
import { signUpSchema } from "../schema/signup-schema";


type SendVerificationOtpResponse = {
  success: boolean;
  message: string;
};

export const sendVerificationOTP = actionClient
  .inputSchema(signUpSchema.pick({
    email: true,
  }))
  .action(
    async ({
      parsedInput,
    }): Promise<SendVerificationOtpResponse> => {
      const { email } = parsedInput;

      try {
        const existingUser = await prisma.user.findUnique({
          where: {
            email,
          },
          select: {
            id: true,
            emailVerified: true,
          },
        });

        if (existingUser?.emailVerified) {
          throw new AppError(
            "Email is already registered.",
            "EMAIL_ALREADY_EXISTS",
            409,
          );
        }

        await auth.api.sendVerificationOTP({
          body: {
            email,
            type: "email-verification",
          },
        });

        return {
          success: true,
          message:
            "Verification code has been sent to your email.",
        };
      } catch (error) {
        if (error instanceof AppError) {
          throw error;
        }

        console.error(
          "[SEND_VERIFICATION_OTP]",
          {
            email,
            error,
            timestamp: new Date().toISOString(),
          },
        );

        throw new AppError(
          "Unable to send verification code.",
          "SEND_VERIFICATION_FAILED",
          500,
        );
      }
    },
  );