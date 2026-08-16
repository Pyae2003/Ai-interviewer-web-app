import type { InterviewResultData } from "../type/type";

export type InterviewResultProps = Readonly<{
  result: InterviewResultData;
}>;

export type InterviewGrade = "A+" | "A" | "B" | "C" | "D";

export type InterviewResultSummary = Readonly<{
  score: number;
  completionRate: number;
  easyScore: number;
  mediumScore: number;
  hardScore: number;
  grade: InterviewGrade;
  passed: boolean;
}>;
