"use server";

import { actionClient } from "@/lib/safe-action";
import { auth } from "@/lib/auth";
import { AppError } from "@/middleware";

import { signUpSchema } from "../schema/signup-schema";

type SignUpResponse = {
  success: boolean;
  message: string;
  data?: {
    userId: string;
    email: string;
    name: string;
  };
};

export const signUpUser = actionClient
  .inputSchema(signUpSchema)
  .action(async ({ parsedInput }): Promise<SignUpResponse> => {
    const email = parsedInput.email.trim().toLowerCase();

    const name = parsedInput.name.trim();

    const password = parsedInput.password;

    try {
      const result = await auth.api.signUpEmail({
        body: {
          name,
          email,
          password,
        },
      });

      if (!result?.user) {
        throw new AppError("Unable to create account", "SIGNUP_FAILED", 400);
      }
      console.log("2️⃣ User created:", result.user.email);

      console.log("3️⃣ Sending verification OTP...");

      await auth.api.sendVerificationOTP({
        body: {
          email: result.user.email,
          type: "email-verification",
        },
      });

      console.log("4️⃣ Verification OTP sent");

      return {
        success: true,
        message: "Account created. Verification code sent.",
        data: {
          userId: result.user.id,
          email: result.user.email,
          name: result.user.name,
        },
      };
    } catch (error: any) {
      console.error("[SIGNUP_ERROR]", {
        email,
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      });

      const message = error?.message?.toLowerCase?.() ?? "";

      if (message.includes("already") || message.includes("exists")) {
        throw new AppError(
          "An account with this email already exists",
          "EMAIL_ALREADY_EXISTS",
          409,
        );
      }

      throw new AppError("Failed to create account", "SIGNUP_FAILED", 500);
    }
  });
