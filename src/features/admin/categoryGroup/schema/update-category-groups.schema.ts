import { z } from "zod";
import { createCategoryGroupSchema } from "./create-category-groups.schema";

export const updateCategoryGroupsSchema = createCategoryGroupSchema
  .partial()
  .extend({
    id: z.string().cuid("Invalid Category id"),
  })
  .superRefine((data, ctx) => {
    const hasUpdates = Object.entries(data).some(
      ([key, value]) => key !== "id" && value !== undefined,
    );

    if (!hasUpdates) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "At least one field is required for Edit",
        path: ["root"],
      });
    }
  });

export type UpdateCategoryGroupsInput = z.infer<
  typeof updateCategoryGroupsSchema
>;
