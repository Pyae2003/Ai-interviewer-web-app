import {
  Difficulty,
  InterviewAnswer,
  InterviewStatus,
  Prisma,
} from "@/generated/prisma/client";
import { QuestionResult } from "../../history/components/history-detail";

export type Category = Prisma.CategoryGetPayload<{
  select: {
    id: true;
    name: true;
  };
}>;

export type Question = {
  id: string;
  questionText: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  orderIndex: number;
};



export type InterviewResultData = {

  completed: boolean;

  interviewId?: string;

  categoryName: string;

  status: InterviewStatus;

  score: number;

  createdAt : Date;

  totalQuestions: number;

  answeredQuestions: number;

  completionRate: number;

  easyScore: number;

  mediumScore: number;

  hardScore: number;

  answers: QuestionResult[];
};
