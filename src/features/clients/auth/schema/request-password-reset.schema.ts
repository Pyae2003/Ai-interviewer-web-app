import { z } from "zod";

export const requestResetPasswordSchema = z.object({
  email: z
    .string("Email is required.")
    .trim()
    .toLowerCase()
    .min(1, "Email is required.")
    .max(255, "Email is too long.")
    .email("Please enter a valid email address."),
});

export type RequestResetPasswordInput = z.infer<
  typeof requestResetPasswordSchema
>;
