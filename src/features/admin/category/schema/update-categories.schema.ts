import { z } from "zod";
import { createCategorySchema } from "./create-categories.schema";


export const updateCategorySchema = createCategorySchema
  .partial()
  .extend({
    id: z
      .string()
      .cuid("Invalid category id"),
  })
  .refine(
    (data  ) =>
      Object.entries(data).some(
        ([key, value]) =>
          key !== "id" && value !== undefined
      ),
    {
      message: "At least one field is required for update",
      path: ["id"],
    }
  );

export type UpdateCategoryInput = z.infer<
  typeof updateCategorySchema
>;