import { z } from "zod";

export const EvaluationSchema = z.object({
  score: z.number().min(0).max(100),
  feedback: z.string(),
  idealAnswer: z.string(),
  strengths: z.string(),
  weaknesses: z.string(),
  missingPoints: z.string().optional(),
});

export type EvaluationResult = z.infer<typeof EvaluationSchema>;