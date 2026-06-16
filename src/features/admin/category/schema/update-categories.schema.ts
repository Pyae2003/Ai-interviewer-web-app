import { z } from "zod";
import { createCategorySchema } from "./create-categories.schema";

export const updateCategorySchema = createCategorySchema
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
        path : ["root"]
      });
    }
  });


export type UpdateCategoryInput = z.infer<
  typeof updateCategorySchema
>;