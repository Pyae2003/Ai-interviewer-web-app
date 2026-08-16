export type QuestionResult = {
  id: string;
  orderIndex: number;
  questionText: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  answer: string;
  score: number;
  isCorrect: boolean;
  feedback: string | null;
  idealAnswer: string | null;
  strengths: string;
  weaknesses: string;
};

export type InterviewHistoryDetailProps = Readonly<{
  categoryName: string;
  score: number;
  totalQuestions: number;
  completedAt: Date;
  questions: QuestionResult[];
}>;

export type InterviewHistorySummary = Readonly<{
  score: number;
  maximumScore: number;
  percentage: number;
  totalQuestions: number;
  correctAnswers: number;
  completedDate: string;
  passed: boolean;
}>;
