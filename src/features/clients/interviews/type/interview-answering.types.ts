import type { Category, Question } from "../type/type";

export type InterviewsClientAnsweringProps = Readonly<{
  interview_Id: string;
  category: Category;
  totalQuestions: number;
  questions: Question[];
}>;
