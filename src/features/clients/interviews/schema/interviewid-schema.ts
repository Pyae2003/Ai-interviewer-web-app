import * as z from "zod"

export const getInterviewIdSchema = z.object({
  id: z.string().cuid("Invalid Question id"),
});
