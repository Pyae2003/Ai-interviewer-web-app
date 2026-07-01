import { Calendar, Trophy } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import HistoryQuestionList from "./history-questions-list";

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

type Props = {
  categoryName: string;
  score: number;
  totalQuestions: number;
  completedAt: Date;
  questions: QuestionResult[];
};

export default function InterviewHistoryDetail({
  categoryName,
  score,
  totalQuestions,
  completedAt,
  questions,
}: Props) {
  const percentage = Math.round((score / (totalQuestions * 10)) * 100);

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      {/* Summary Card */}
      <Card className="overflow-hidden border-0 bg-linear-to-r from-sky-100 via-white to-yellow-100 shadow-lg">
        <CardContent className="p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">{categoryName}</h1>

              <div className="mt-2 flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {new Date(completedAt).toLocaleDateString()}
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center gap-2 justify-center">
                <Trophy className="h-6 w-6 text-yellow-500" />
                <span className="text-4xl font-bold">{score}</span>
              </div>

              <p className="text-sm text-muted-foreground">Overall Score</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="h-3 overflow-hidden rounded-full bg-zinc-200">
              <div
                className="h-full bg-linear-to-r from-sky-500 to-yellow-400"
                style={{
                  width: `${percentage}%`,
                }}
              />
            </div>

            <p className="mt-2 text-right text-sm text-muted-foreground">
              {percentage}%
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Questions */}
      <div className="space-y-5">
        {questions.map((item, index) => (
          <HistoryQuestionList key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}
