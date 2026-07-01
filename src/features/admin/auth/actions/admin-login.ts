"use server";

import { headers } from "next/headers";

import { actionClient } from "@/lib/safe-action";
import { auth } from "@/lib/auth";
import { AppError } from "@/middleware";

import { adminLoginSchema } from "../schema/admin-login-schema";
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

export const loginAdmin = actionClient
  .inputSchema(adminLoginSchema)
  .action(async ({ parsedInput }): Promise<LoginResponse> => {
    const { email, password } = parsedInput;

    try {
      const requestHeaders = await headers();

      const result = await auth.api.signInEmail({
        body: {
          email,
          password,
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

      /**
       * IMPORTANT
       * Only ADMIN can access admin panel.
       */
      if (result.user.role !== UserRole.admin) {
        await auth.api.signOut({
          headers: requestHeaders,
        });

        throw new AppError(
          "Invalid email or password",
          "LOGIN_FAILED",
          401,
        );
      }

      console.info("[ADMIN_LOGIN_SUCCESS]", {
        userId: result.user.id,
        email: result.user.email,
        timestamp: new Date().toISOString(),
      });

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
      console.error("[ADMIN_LOGIN_ERROR]", {
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