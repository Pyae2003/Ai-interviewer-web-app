import { Bot } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

type InterviewAnswerEditorProps = {
  answer: string;
  disabled: boolean;
  onAnswerChange: (answer: string) => void;
};

export function InterviewAnswerEditor({
  answer,
  disabled,
  onAnswerChange,
}: InterviewAnswerEditorProps) {
  return (
    <Card className="rounded-3xl border border-border/70 bg-card shadow-[0_12px_36px_rgba(15,23,42,0.06)]">
      <CardContent className="p-5 sm:p-7">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-violet-200 bg-violet-50 text-violet-600 shadow-sm dark:border-violet-900/70 dark:bg-violet-950/50 dark:text-violet-400">
            <Bot className="size-4" aria-hidden="true" />
          </div>

          <div className="min-w-0">
            <label
              htmlFor="interview-answer"
              className="text-sm font-semibold text-foreground"
            >
              Your Answer
            </label>

            <p
              id="interview-answer-help"
              className="text-xs text-muted-foreground"
            >
              Explain clearly and support your answer with examples.
            </p>
          </div>
        </div>

        <Textarea
          id="interview-answer"
          rows={10}
          aria-describedby="interview-answer-help interview-character-count"
          placeholder="Write your detailed answer here..."
          value={answer}
          disabled={disabled}
          onChange={(event) => onAnswerChange(event.target.value)}
          className="min-h-64 resize-none rounded-2xl border-border bg-background p-4 text-sm leading-7 shadow-none transition-[border-color,box-shadow] placeholder:text-muted-foreground/70 focus-visible:border-sky-500 focus-visible:ring-sky-200/70 dark:focus-visible:ring-sky-900 sm:text-base"
        />

        <div className="mt-3 flex flex-wrap justify-between gap-2 text-xs text-muted-foreground">
          <span>Provide a detailed and relevant response.</span>

          <span id="interview-character-count" aria-live="polite">
            {answer.length} characters
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
