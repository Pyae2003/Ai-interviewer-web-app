import * as z from "zod"

export const getQuestionByIdSchema = z.object({
  id: z.string().cuid("Invalid Question id"),
});
