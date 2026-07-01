"use server";

import { headers } from "next/headers";

import { actionClient } from "@/lib/safe-action";
import { auth } from "@/lib/auth";
import { AppError } from "@/middleware";

import { loginSchema } from "../schema/login-schema";
import { UserRole } from "@/generated/prisma/enums";

type LoginResponse = {
  success: boolean;
  message: string;
  data?: {
    userId: string;
    email: string;
    name: string;
  };
};

export const loginUser = actionClient
  .inputSchema(loginSchema)
  .action(async ({ parsedInput }): Promise<LoginResponse> => {
    const { email, password, rememberMe } = parsedInput;

    try {
      const requestHeaders = await headers();

      const result = await auth.api.signInEmail({
        body: {
          email,
          password,
          rememberMe,
        },
        headers: requestHeaders,
      });

      if (!result?.user) {
        throw new AppError(
          "Invalid email or password",
          "LOGIN_FAILED",
          401,
        );
      }

      // Block admin accounts from user login
      if (result.user.role === UserRole.admin) {
        await auth.api.signOut({
          headers: requestHeaders,
        });

        throw new AppError(
          "Invalid email or password",
          "LOGIN_FAILED",
          401,
        );
      }

      return {
        success: true,
        message: "Login successful",
        data: {
          userId: result.user.id,
          email: result.user.email,
          name: result.user.name,
        },
      };
    } catch (error) {
      console.error("[USER_LOGIN_ERROR]", {
        email,
        timestamp: new Date().toISOString(),
      });

      throw new AppError(
        "Invalid email or password",
        "LOGIN_FAILED",
        401,
      );
    }
  });