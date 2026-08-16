import { FileQuestion } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function EmptyInterviewState() {
  return (
    <main className="flex min-h-[65vh] items-center justify-center bg-muted/20 px-4 py-12">
      <Card className="w-full max-w-lg overflow-hidden rounded-3xl border border-border/70 bg-card shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
        <div aria-hidden="true" className="h-1 bg-sky-500" />

        <CardContent className="flex flex-col items-center px-6 py-14 text-center">
          <div className="flex size-16 items-center justify-center rounded-2xl border border-sky-200 bg-sky-50 text-sky-600 dark:border-sky-900/70 dark:bg-sky-950/50 dark:text-sky-400">
            <FileQuestion className="size-7" aria-hidden="true" />
          </div>

          <h1 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
            No questions found
          </h1>

          <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
            Interview questions are currently unavailable for this category.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
