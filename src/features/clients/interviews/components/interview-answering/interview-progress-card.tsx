import { CheckCircle2, CircleDot } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type InterviewProgressCardProps = {
  currentQuestion: number;
  totalQuestions: number;
  answeredCount: number;
  remainingQuestions: number;
  progress: number;
};

export function InterviewProgressCard({
  currentQuestion,
  totalQuestions,
  answeredCount,
  remainingQuestions,
  progress,
}: InterviewProgressCardProps) {
  const roundedProgress = Math.round(progress);

  return (
    <Card className="sticky top-20 z-20 rounded-2xl border border-border/70 bg-background/95 shadow-[0_10px_32px_rgba(15,23,42,0.07)] backdrop-blur-lg">
      <CardContent className="space-y-4 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Question {currentQuestion} of {totalQuestions}
            </p>

            <p className="mt-0.5 text-xs text-muted-foreground">
              Complete your answer before continuing
            </p>
          </div>

          <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-sm font-semibold text-sky-700 dark:border-sky-900/70 dark:bg-sky-950/50 dark:text-sky-400">
            {roundedProgress}%
          </span>
        </div>

        <Progress
          value={progress}
          aria-label={`Interview progress ${roundedProgress}%`}
          className="h-2.5 bg-muted [&>div]:bg-sky-500"
        />

        <dl className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <CheckCircle2
              className="size-3.5 text-emerald-500"
              aria-hidden="true"
            />
            <dt>Answered</dt>
            <dd className="font-semibold text-foreground">
              {answeredCount}
            </dd>
          </div>

          <div className="flex items-center gap-1.5">
            <CircleDot
              className="size-3.5 text-violet-500"
              aria-hidden="true"
            />
            <dt>Remaining</dt>
            <dd className="font-semibold text-foreground">
              {remainingQuestions}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
