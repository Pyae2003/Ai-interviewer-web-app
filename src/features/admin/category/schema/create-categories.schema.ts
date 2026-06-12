import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string(
       "Category name is required",
    )
    .trim()
    .min(3, "Category name must be at least 3 characters")
    .max(50, "Category name cannot exceed 50 characters")
    .regex(
      /^[a-zA-Z0-9\s-&]+$/,
      "Category name contains invalid characters"
    ),

  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters")
    .optional()
    .or(z.literal("")),

  isActive: z.boolean(),

  sortOrder: z
    .number()
    .int()
    .min(0)
    .max(9999)
});

export type CategoryInput = z.infer<typeof createCategorySchema>;