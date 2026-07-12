"use server";

import VerifyEmailTemplate from "@/features/clients/auth/components/email-verify-template";
import { resend } from "./resend";
import { AppError } from "@/middleware";

type Props = {
  email: string;
  otp: string;
  type: "email-verification" | "sign-in" | "change-email" | "forget-password";
};

export async function sendVerificationEmail({ email, otp, type }: Props) {
try {
      const subjects = {
    "email-verification": "Verify your email",
    "sign-in": "Your Login Verification Code",
    "change-email": "Confirm your new email",
    "forget-password": "Reset your password",
  };

  const subject = subjects[type];

  const { data, error } = await resend.emails.send({
    from: "AI Interviewer <noreply@ai-interviewer.site>",

    to: email,

    subject,

    react: VerifyEmailTemplate({
      otp,
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
    recipient: email,
  });

  return {
    success: true,
    message: " Email Verification successfully.",
    emailId: data!.id,
  };
} catch (error) {
     if (error instanceof AppError) {
      throw error;
    }

    console.error("[SEND_EMAIL_VERIFICATION_OTP]", error);

    throw new AppError(
      "Unable to send verification otp email.",
      "EMAIL_OTP_SEND_FAILED",
      500,
    );
}
}
