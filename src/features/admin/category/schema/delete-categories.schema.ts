import { z } from "zod";

/**
 * Schema for deleting a single category
 */
export const deleteCategorySchema = z.object({
  id: z
    .string("Category ID is required.Category ID must be a string")
    .cuid("Invalid category ID format"),
});

export type DeleteCategoryInput = z.infer<typeof deleteCategorySchema>;

/**
 * Schema for bulk deleting multiple categories (Production Bonus)
 */
export const bulkDeleteCategoriesSchema = z.object({
  ids: z
    .array(
      z
        .string("Each ID must be a string")
        .cuid("Invalid category ID format found in the list"),
    )
    .min(1, "At least one category ID is required for deletion")
    .max(
      100,
      "You can only delete up to 100 categories at a time to prevent server overload",
    ),
});

export type BulkDeleteCategoriesInput = z.infer<
  typeof bulkDeleteCategoriesSchema
>;
