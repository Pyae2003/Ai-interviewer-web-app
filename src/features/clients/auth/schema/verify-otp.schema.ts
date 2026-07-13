import { z } from "zod";

export const verifyOtpSchema = z.object({
  email: z
    .string("Email is required.")
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address.")
    .max(255, "Email is too long."),

  otp: z
    .string("Verification code is required.")
    .trim()
    .length(6, "Verification code must be exactly 6 digits.")
    .regex(/^\d{6}$/, "Verification code must contain only numbers."),
});

export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
