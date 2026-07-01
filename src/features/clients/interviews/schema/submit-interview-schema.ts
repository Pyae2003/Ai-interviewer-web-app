
import { z } from "zod";

export const submitInterviewSchema = z.object({
  interviewId: z.string().cuid(),

  answers: z
    .array(
      z.object({
        questionId: z.string().cuid(),
        answer: z.string().trim().min(1).max(5000),
      }),
    )
    .min(1)
    .max(20),
});

export type SubmitInterviewInput =
  z.infer<typeof submitInterviewSchema>;