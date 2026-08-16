import { Lightbulb } from "lucide-react";

type IdealAnswerSectionProps = {
  answer: string | null;
};

export function IdealAnswerSection({
  answer,
}: IdealAnswerSectionProps) {
  return (
    <section className="rounded-2xl border border-amber-200/80 bg-amber-50/55 p-5 dark:border-amber-900/60 dark:bg-amber-950/25">
      <div className="mb-4 flex items-center gap-3 font-semibold text-foreground">
        <span className="flex size-9 items-center justify-center rounded-xl border border-amber-200 bg-white text-amber-600 shadow-sm dark:border-amber-900 dark:bg-zinc-900 dark:text-amber-400">
          <Lightbulb className="size-4" aria-hidden="true" />
        </span>

        Ideal Answer
      </div>

      <div className="whitespace-pre-wrap rounded-2xl border border-border/70 bg-background/80 p-5 text-sm leading-8 text-foreground/85 sm:text-base">
        {answer?.trim() ||
          "No ideal answer is available for this question."}
      </div>
    </section>
  );
}
