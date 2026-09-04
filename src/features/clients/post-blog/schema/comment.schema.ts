import { z } from "zod";

export const createCommentSchema = z.object({
  postId: z
    .string()
    .trim()
    .min(1, "Post ID is required")
    .max(100, "Invalid post ID"),

  content: z
    .string()
    .trim()
    .min(1, "Comment cannot be empty")
    .max(500, "Comment must be less than 500 characters"),
});

export type CreateCommentInput = z.infer<typeof createCommentSchema>;