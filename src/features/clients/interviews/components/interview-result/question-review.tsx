import { FileQuestion } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { InterviewResultData } from "../../type/type";
import HistoryQuestionList from "@/features/clients/history/components/history-question/history-question-list";



type QuestionReviewProps = {
  answers: InterviewResultData["answers"];
};

export function QuestionReview({ answers }: QuestionReviewProps) {
  return (
    <section aria-labelledby="question-review-heading">
      <div className="mb-5">
        <h2
          id="question-review-heading"
          className="text-2xl font-bold tracking-tight text-foreground"
        >
          Question review
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Review your answers, feedback, strengths, and improvement areas.
        </p>
      </div>

      {answers.length > 0 ? (
        <div className="space-y-5">
          {answers.map((item, index) => (
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
              No answers to review
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Submitted answers will appear here.
            </p>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
