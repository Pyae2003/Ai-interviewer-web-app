import { z } from "zod";

/**
 * Schema for deleting a single category
 */
export const deleteQuestionSchema = z.object({
  id: z
    .string("Category ID is required.Category ID must be a string")
    .cuid("Invalid category ID format"),
});

export type DeleteQuestionInput = z.infer<typeof deleteQuestionSchema>;
