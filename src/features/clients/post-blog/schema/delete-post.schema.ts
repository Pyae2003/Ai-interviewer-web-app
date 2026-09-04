import { z } from "zod";

export const deletePostSchema = z.object({
  postId: z
    .string()
    .trim()
    .min(1, "Post ID is required")
    .max(100, "Invalid post ID"),
});

export type DeletePostInput = z.infer<
  typeof deletePostSchema
>;