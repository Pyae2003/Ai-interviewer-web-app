"use server";

import ResetPasswordEmailTemplate from "@/features/clients/auth/components/reset-password-email-template";
import { resend } from "@/lib/resend";
import { AppError } from "@/middleware";

interface SendResetPasswordEmailOptions {
  to: string;
  name: string;
  resetPasswordLink: string;
}

export interface SendEmailResponse {
  success: boolean;
  message: string;
  emailId: string;
}

export async function sendResetPasswordEmail({
  to,
  name,
  resetPasswordLink,
}: SendResetPasswordEmailOptions): Promise<SendEmailResponse> {
  try {
    const { data, error } = await resend.emails.send({
      from: "AI Interviewer <onboarding@resend.dev>",

      to,

      subject: "Reset your AI Interviewer password",

      react: ResetPasswordEmailTemplate({
        userFirstname: name,
        resetPasswordLink,
      }),
    });

    if (error) {
      console.error("[RESEND_ERROR]", error);

      throw new AppError(
        "Failed to send reset password email",
        "EMAIL_SEND_FAILED",
        500,
      );
    }

    console.info("[EMAIL_SENT]", {
      emailId: data?.id,
      recipient: to,
    });

    return {
      success: true,
      message: "Reset password email sent successfully.",
      emailId: data!.id,
    };
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    console.error("[SEND_RESET_PASSWORD_EMAIL]", error);

    throw new AppError(
      "Unable to send reset password email.",
      "EMAIL_SEND_FAILED",
      500,
    );
  }
}