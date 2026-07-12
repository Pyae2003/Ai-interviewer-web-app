import { z } from "zod";

export const requestVerificationOTPSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email address"),

  type: z.enum([
    "email-verification",
    "sign-in",
    "change-email",
  ]),
});

export type RequestVerificationOTPInput =
  z.infer<typeof requestVerificationOTPSchema>;