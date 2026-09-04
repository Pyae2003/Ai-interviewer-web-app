import { z } from "zod";

export const createReplySchema = z.object({
  postId: z
    .string()
    .trim()
    .min(1, "Post ID is required"),

  parentId: z
    .string()
    .trim()
    .min(1, "Parent comment ID is required"),

  content: z
    .string()
    .trim()
    .min(1, "Reply cannot be empty")
    .max(
      2000,
      "Reply must be 2000 characters or less",
    ),
});