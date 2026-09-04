import { z } from "zod";

export const createPostSchema = z.object({
  interviewId: z
    .string()
    .trim()
    .min(1, "Interview ID is required")
    .max(100, "Invalid interview ID")
    .optional(),

  caption: z
    .string()
    .trim()
    .min(1, "Caption is required")
    .max(2000, "Caption must be less than 2000 characters"),

  images: z.array(z.string()).max(4, "You can upload maximum 4 images"),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
