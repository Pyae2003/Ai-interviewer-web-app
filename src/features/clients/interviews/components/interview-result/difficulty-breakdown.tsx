import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { InterviewResultSummary } from "../../type/interview-result.types";


const difficultyStyles = {
  easy: {
    badge:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/50 dark:text-emerald-400",
    progress: "[&>div]:bg-emerald-500",
  },
  medium: {
    badge:
      "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/50 dark:text-amber-400",
    progress: "[&>div]:bg-amber-500",
  },
  hard: {
    badge:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/50 dark:text-red-400",
    progress: "[&>div]:bg-red-500",
  },
} as const;

type DifficultyBreakdownProps = {
  summary: InterviewResultSummary;
};

export function DifficultyBreakdown({
  summary,
}: DifficultyBreakdownProps) {
  const items = [
    {
      key: "easy" as const,
      label: "Easy",
      value: summary.easyScore,
    },
    {
      key: "medium" as const,
      label: "Medium",
      value: summary.mediumScore,
    },
    {
      key: "hard" as const,
      label: "Hard",
      value: summary.hardScore,
    },
  ];

  return (
    <section aria-labelledby="difficulty-heading">
      <Card className="rounded-3xl border border-border/70 bg-card shadow-[0_14px_42px_rgba(15,23,42,0.07)]">
        <CardContent className="p-5 sm:p-7">
          <div className="mb-7">
            <h2
              id="difficulty-heading"
              className="text-xl font-bold tracking-tight text-foreground sm:text-2xl"
            >
              Difficulty breakdown
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Compare your performance across each difficulty level.
            </p>
          </div>

          <div className="space-y-4">
            {items.map((item) => {
              const styles = difficultyStyles[item.key];

              return (
                <div
                  key={item.key}
                  className="rounded-2xl border border-border/70 bg-muted/25 p-4 transition-colors duration-200 hover:bg-muted/50"
                >
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <span
                      className={cn(
                        "rounded-full border px-3 py-1 text-sm font-semibold",
                        styles.badge,
                      )}
                    >
                      {item.label}
                    </span>

                    <span className="text-sm font-bold text-foreground">
                      {item.value}%
                    </span>
                  </div>

                  <Progress
                    value={item.value}
                    aria-label={`${item.label} difficulty score ${item.value}%`}
                    className={cn(
                      "h-2.5 bg-muted [&>div]:transition-transform [&>div]:duration-700 [&>div]:ease-out",
                      styles.progress,
                    )}
                  />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
