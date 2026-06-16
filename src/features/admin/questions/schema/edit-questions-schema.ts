import { z } from "zod";
import { createQuestionSchema } from "./create-questions-schema";

export const updateQuestionSchema = createQuestionSchema
  .partial()
  .extend({
    id: z.string().cuid("Invalid question id"),
  })
  .superRefine((data, ctx) => {
    const hasUpdates = Object.entries(data).some(
      ([key, value]) => key !== "id" && value !== undefined,
    );

    if (!hasUpdates) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "At least one field is required for update",
        path : ["root"]
      });
    }
  });

export type UpdateQuestionInput = z.infer<typeof updateQuestionSchema>;
