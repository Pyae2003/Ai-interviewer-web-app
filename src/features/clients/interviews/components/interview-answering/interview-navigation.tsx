import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type InterviewNavigationProps = {
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  isSubmitting: boolean;
  onPrevious: () => void;
  onNext: () => void;
};

export function InterviewNavigation({
  isFirstQuestion,
  isLastQuestion,
  isSubmitting,
  onPrevious,
  onNext,
}: InterviewNavigationProps) {
  const pendingLabel = isLastQuestion ? "Finishing..." : "Saving...";

  return (
    <nav
      aria-label="Interview question navigation"
      className="grid gap-3 sm:grid-cols-[auto_1fr_auto] sm:items-center"
    >
      <Button
        type="button"
        variant="outline"
        onClick={onPrevious}
        disabled={isFirstQuestion || isSubmitting}
        className="h-11 w-full rounded-xl border-border bg-background px-5 font-medium text-foreground shadow-sm transition-colors hover:bg-muted sm:w-auto"
      >
        <ArrowLeft className="mr-2 size-4" aria-hidden="true" />
        Previous
      </Button>

      <p className="hidden text-center text-xs text-muted-foreground sm:block">
        Your answer is saved before moving forward.
      </p>

      <Button
        type="button"
        onClick={onNext}
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="group h-11 w-full rounded-xl bg-sky-600 px-6 font-semibold text-white shadow-sm transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-sky-700 hover:shadow-md disabled:translate-y-0 sm:min-w-48 sm:w-auto dark:bg-sky-500 dark:hover:bg-sky-600"
      >
        {isSubmitting ? (
          <>
            <Loader2
              className="mr-2 size-4 animate-spin"
              aria-hidden="true"
            />
            <span aria-live="polite">{pendingLabel}</span>
          </>
        ) : isLastQuestion ? (
          <>
            <CheckCircle2
              className="mr-2 size-4"
              aria-hidden="true"
            />
            Finish Interview
          </>
        ) : (
          <>
            Submit &amp; Next
            <ArrowRight
              className="ml-2 size-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </>
        )}
      </Button>
    </nav>
  );
}
