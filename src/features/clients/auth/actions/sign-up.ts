"use server";

import { actionClient } from "@/lib/safe-action";
import { signUpSchema } from "../schema/signup-schema";
import { auth } from "@/lib/auth";
import { AppError } from "@/middleware";

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
    const { name, email, password } = parsedInput;

    try {
      // 1. Call auth provider
      const result = await auth.api.signUpEmail({
        body: { name, email, password ,role : "USER"},
      });

      // 2. Validate response
      if (!result?.user) {
        throw new AppError("Failed to create user account", "USER_CREATE_FAILED");
      }

      // 3. Success response
      return {
        success: true,
        message: "Account created successfully.",
        data: {
          userId: result.user.id,
          email: result.user.email,
          name: result.user.name,
        },
      };
    } catch (error) {
        console.log("Login Server Error",error);
        throw new AppError("This is Login Server Error","USER_CREATE_SERVER FAIL",500)
    }
  });