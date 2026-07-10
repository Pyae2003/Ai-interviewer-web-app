import { z } from "zod";

export const getCategoryGroupBySlugSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Invalid slug"),
});

export type GetCategoryGroupBySlugInput =
  z.infer<typeof getCategoryGroupBySlugSchema>;