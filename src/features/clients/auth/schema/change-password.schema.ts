import { z } from "zod";

export const changePasswordSchema = z
  .object({
    token: z
      .string()
      .trim()
      .min(6, "Reset token is required.")
      .max(512, "Invalid reset token."),

    newPassword: z
      .string()
      .trim()
      .min(12, "Password must be at least 8 characters.")
      .max(128, "Password must not exceed 128 characters.")
      .regex(
        /[A-Z]/,
        "Password must contain at least one uppercase letter.",
      )
      .regex(
        /[a-z]/,
        "Password must contain at least one lowercase letter.",
      )
      .regex(
        /[0-9]/,
        "Password must contain at least one number.",
      )
      .regex(
        /[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]/,
        "Password must contain at least one special character.",
      ),

    confirmPassword: z
      .string()
      .trim()
      .min(1, "Please confirm your new password."),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Passwords do not match.",
      });
    }
  });

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;