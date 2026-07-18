import { z } from "zod";

export const editProfileSchema = z.object({
  id: z
    .string()
    .min(1, "User ID is required."),

  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name cannot exceed 50 characters."),

  image: z
    .union([
      z.string().trim().url("Invalid image URL."),
      z.literal(""),
    ])
    .optional(),
});

export type EditProfileInput = z.infer<
  typeof editProfileSchema
>;