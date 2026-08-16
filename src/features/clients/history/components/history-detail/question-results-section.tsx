import { FileQuestion } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { QuestionResult } from "../../types/ interview-history.types";
import HistoryQuestionList from "../history-question/history-question-list";



type QuestionResultsSectionProps = {
  questions: QuestionResult[];
};

export function QuestionResultsSection({
  questions,
}: QuestionResultsSectionProps) {
  return (
    <section aria-labelledby="question-results-heading">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2
            id="question-results-heading"
            className="text-2xl font-bold tracking-tight text-foreground"
          >
            Question breakdown
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Review your answers, feedback, strengths, and improvement areas.
          </p>
        </div>

        <span className="hidden rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-medium text-violet-700 sm:block dark:border-violet-900/70 dark:bg-violet-950/50 dark:text-violet-400">
          {questions.length} {questions.length === 1 ? "question" : "questions"}
        </span>
      </div>

      {questions.length > 0 ? (
        <div className="space-y-5">
          {questions.map((item, index) => (
            <HistoryQuestionList
              key={item.id}
              item={item}
              index={index}
            />
          ))}
        </div>
      ) : (
        <Card className="rounded-2xl border border-border/70 bg-card">
          <CardContent className="flex flex-col items-center px-6 py-10 text-center">
            <div className="flex size-12 items-center justify-center rounded-xl border border-violet-200 bg-violet-50 text-violet-600 dark:border-violet-900/70 dark:bg-violet-950/50 dark:text-violet-400">
              <FileQuestion className="size-5" aria-hidden="true" />
            </div>

            <p className="mt-4 font-semibold text-foreground">
              No question results
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Completed question results will appear here.
            </p>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
