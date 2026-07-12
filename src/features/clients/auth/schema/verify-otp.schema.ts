import { z } from "zod";

export const verifyOtpSchema = z.object({
  otp: z
    .string()
    .trim()
    .length(6, "Verification code must be exactly 6 digits.")
    .regex(/^\d{6}$/, "Verification code must contain only numbers."),
});

export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;