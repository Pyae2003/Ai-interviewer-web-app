import { z } from "zod";

export const userIdSchema = z.object({
  userId: z
    .string(
       "User id is required",
    )
    .trim()
    .min(1, "User id is required")
});