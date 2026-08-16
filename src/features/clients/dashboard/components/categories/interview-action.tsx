"use client";

import { useTransition } from "react";
import {
  Bot,
  Loader2,
  Mic,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { startInterview } from "@/features/clients/interviews/actions/start-interview";



type InterviewActionProps = {
  categoryId: string;
  categoryName: string;
  isActive: boolean;
};

export function InterviewAction({
  categoryId,
  categoryName,
  isActive,
}: InterviewActionProps) {
  const [isPending, startTransition] = useTransition();

  function handleStart() {
    if (isPending || !isActive) {
      return;
    }

    startTransition(() => {
      void startInterview(categoryId);
    });
  }

  const buttonLabel = isPending
    ? "Starting..."
    : isActive
      ? "Start Interview"
      : "Unavailable";

  return (
    <div className="mt-5 rounded-2xl border border-sky-200 bg-sky-50/70 p-4 dark:border-sky-900/70 dark:bg-sky-950/30">
      <div className="gap-4 text-center sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 items-start ">
          <div className="flex size-9 mb-3 w-full text-center items-center justify-center  text-sky-600  dark:bg-zinc-900 dark:text-sky-400">
            <Bot className="size-4" aria-hidden="true" />
          </div>

          <div className="min-w-0">
            <h4 className="font-bold tracking-tight text-foreground">
              {isActive
                ? "Ready to practice?"
                : "Category unavailable"}
            </h4>

            <p className="mt-1  text-sm text-muted-foreground">
              {isActive
                ? "Start a focused AI-powered interview session."
                : "This category is not accepting interviews right now."}
            </p>
          </div>
        </div>

        <Button
          size="sm"
          type="button"
          disabled={isPending || !isActive}
          onClick={handleStart}
          aria-busy={isPending}
          aria-live="polite"
          aria-label={
            isActive
              ? `Start ${categoryName} interview`
              : `${categoryName} interview is unavailable`
          }
          className="h-10 shrink-0 mt-3 rounded-xl bg-sky-600 px-4 font-semibold text-white shadow-sm transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-sky-700 hover:shadow-md disabled:translate-y-0 disabled:opacity-60 dark:bg-sky-500 dark:hover:bg-sky-600"
        >
          {isPending ? (
            <Loader2
              className="mr-2 size-4 animate-spin"
              aria-hidden="true"
            />
          ) : (
            <Mic className="mr-2 size-4" aria-hidden="true" />
          )}

          {buttonLabel}
        </Button>
      </div>
    </div>
  );
}
