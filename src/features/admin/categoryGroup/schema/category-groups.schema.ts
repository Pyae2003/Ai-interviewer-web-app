import { CategoryGroupType } from "@/generated/prisma/enums";
import { z } from "zod";

export const categoryGroupBaseSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters.")
    .max(100, "Name cannot exceed 100 characters."),

  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug may only contain lowercase letters, numbers and hyphens.",
    )
    .min(3)
    .max(100),

  type: z.enum(CategoryGroupType),

  description: z.string().trim().max(500).optional(),

  icon: z.string().trim().max(100).optional(),

  image: z.string().trim().url("Invalid image URL.").optional(),

  color: z
    .string()
    .trim()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color.")
    .optional(),

  order: z.number().int().min(0).default(0).optional(),

  isActive: z.boolean(),
});
