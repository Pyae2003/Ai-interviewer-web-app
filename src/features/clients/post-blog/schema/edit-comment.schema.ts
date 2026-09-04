import { z } from "zod";


export const updateCommentSchema = z.object({
  commentId: z
    .string()
    .trim()
    .min(1, "Comment ID is required"),

  content: z
    .string()
    .trim()
    .min(1, "Comment cannot be empty")
    .max(2000, "Comment must be 2000 characters or less"),
});
