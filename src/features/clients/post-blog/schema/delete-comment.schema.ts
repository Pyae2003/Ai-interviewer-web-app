import { z } from "zod";

export const deleteCommentSchema = z.object({
  commentId: z
    .string()
    .trim()
    .min(1, "Comment ID is required"),
});