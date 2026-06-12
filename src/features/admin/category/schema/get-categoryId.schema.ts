import * as z from "zod"

export const getCategoryByIdSchema = z.object({
  id: z.string().cuid("Invalid category id"),
});