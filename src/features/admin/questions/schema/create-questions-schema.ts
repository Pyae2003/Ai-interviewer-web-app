import { z } from "zod";

export const createQuestionSchema = z
  .object({
    categoryName: z
      .string("Category must be a string")
      .trim()
      .min(3, "Category is required")
      .max(100, "Category name cannot exceed 100 characters"),

    question: z
      .string("Question must be a string")
      .trim()
      .min(10, "Question must be at least 10 characters")
      .max(500, "Question cannot exceed 500 characters")
      .refine((value) => value.replace(/\s+/g, " ").trim().length >= 10, {
        message: "Question must contain meaningful content",
      }),

    difficulty: z.enum(["EASY", "MEDIUM", "HARD"], "Difficulty is required"),
  })
  .strict();

export type CreateQuestionInput = z.infer<typeof createQuestionSchema>;
