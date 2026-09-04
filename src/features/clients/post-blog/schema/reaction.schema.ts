import { z } from "zod";

export const reactionSchema = z.object({
  postId: z
    .string()
    .trim()
    .min(1, "Post ID is required")
    .max(100, "Invalid post ID"),

  type: z.enum([
    "LIKE",
    "LOVE",
    "HAHA",
    "WOW",
    "SAD",
    "ANGRY",
  ]),
});

export type ReactionInput = z.infer<typeof reactionSchema>;