import { z } from "zod";

export const answerQuestionSchema = z.object({
  interviewId: z
    .string()
    .cuid("Invalid interview id"),

  interviewQuestionId: z
    .string()
    .cuid("Invalid question id"),

  answer: z
    .string()
    .trim()
    .min(10, "Answer must be at least 10 characters")
    .max(5000, "Answer is too long"),
});

export type AnswerQuestionInput =
  z.infer<typeof answerQuestionSchema>;