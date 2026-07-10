import { z } from "zod";

export const getCategoryGroupByIdSchema = z.object({
  id: z
    .string("Category group id is required")
    .trim()
    .cuid("Invalid category group id"),
});

export type GetCategoryGroupByIdInput = z.infer<
  typeof getCategoryGroupByIdSchema
>;
