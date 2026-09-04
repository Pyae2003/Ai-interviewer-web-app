import { z } from "zod";

export const editPostSchema = z.object({
  postId: z
    .string()
    .trim()
    .min(1, "Post ID is required")
    .max(100, "Invalid post ID"),

  caption: z
    .string()
    .trim()
    .min(1, "Caption is required")
    .max(5000, "Caption is too long"),

  images: z
    .array(
      z.string()
    )
    .max(4, "Maximum 4 images are allowed"),
});

export type EditPostInput = z.infer<typeof editPostSchema>;