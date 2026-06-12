import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address")
    .max(255, "Email is too long"),

  password: z
      .string()
      .min(12, "Password must be at least 12 characters")
      .max(128, "Password is too long")
      .regex(/[a-z]/, "Password must contain a lowercase letter")
      .regex(/[A-Z]/, "Password must contain an uppercase letter")
      .regex(/[0-9]/, "Password must contain a number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain a special character"
      ),
  rememberMe: z.boolean(),
});

export type LoginInput = z.infer<typeof loginSchema>;
