"use server";

import { actionClient } from "@/lib/safe-action";
import { auth } from "@/lib/auth";

import { requestVerificationOTPSchema } from "../schema/request-verification-otp.schema";

type RequestVerificationOTPResponse = {
  success: boolean;
  message: string;
};

export const requestVerificationOTP = actionClient
  .inputSchema(requestVerificationOTPSchema)
  .action(
    async ({
      parsedInput,
    }): Promise<RequestVerificationOTPResponse> => {
      const { email, type } = parsedInput;

      try {
        await auth.api.sendVerificationOTP({
          body: {
            email,
            type,
          },
        });

        return {
          success: true,
          message:
            "If the email exists, a verification code has been sent.",
        };
      } catch (error: any) {
        console.error("[SEND_VERIFICATION_OTP]", {
          email,
          type,
          message: error?.message,
          timestamp: new Date().toISOString(),
        });

        return {
          success: true,
          message:
            "If the email exists, a verification code has been sent.",
        };
      }
    },
  );