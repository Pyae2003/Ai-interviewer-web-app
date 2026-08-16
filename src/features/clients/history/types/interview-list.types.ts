export type InterviewListItem = Readonly<{
  id: string;
  score: number | null;
  status: string;
  createdAt: Date;
  totalQuestions: number;
  answeredQuestions: number;
}>;

export type InterviewListResult = Readonly<{
  categoryId: string;
  categoryName: string;
  interviews: InterviewListItem[];
}>;

export type InterviewListProps = Readonly<{
  result: InterviewListResult;
}>;