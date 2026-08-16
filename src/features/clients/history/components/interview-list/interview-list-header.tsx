import { History } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { AnimatedCategoryTitle } from "./animated-category-title";


type InterviewListHeaderProps = Readonly<{
  categoryName: string;
  interviewCount: number;
}>;

export function InterviewListHeader({
  categoryName,
  interviewCount,
}: InterviewListHeaderProps) {
  const safeCategoryName = categoryName.trim() || "Interview Category";
  const countLabel = interviewCount === 1 ? "interview" : "interviews";

  return (
    <header className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-card p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-sky-200 bg-sky-50 text-sky-600 dark:border-sky-900/70 dark:bg-sky-950/40 dark:text-sky-400">
          <History className="size-5" aria-hidden="true" />
        </div>

        <div className="min-w-0 border-l-2 border-sky-500 pl-4">
          <AnimatedCategoryTitle title={safeCategoryName} />

          <p className="mt-1 text-sm text-muted-foreground">
            Review your interview attempts and progress.
          </p>
        </div>
      </div>

      <Badge
        variant="outline"
        className="w-fit shrink-0 rounded-full border-violet-200 bg-violet-50 px-3 py-1.5 font-semibold text-violet-700 dark:border-violet-900/70 dark:bg-violet-950/40 dark:text-violet-400"
      >
        {interviewCount} {countLabel}
      </Badge>
    </header>
  );
}