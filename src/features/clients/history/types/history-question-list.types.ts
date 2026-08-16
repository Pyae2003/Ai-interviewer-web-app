import { QuestionResult } from "./ interview-history.types";

export type HistoryQuestionListProps = Readonly<{
  index: number;
  item: QuestionResult;
}>;
