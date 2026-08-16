import { ClipboardList } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function EmptyInterviewList() {
  return (
    <Card className="rounded-2xl border border-dashed border-sky-200 bg-sky-50/40 shadow-none dark:border-sky-900/70 dark:bg-sky-950/20">
      <CardContent className="flex flex-col items-center px-6 py-14 text-center">
        <div className="flex size-12 items-center justify-center rounded-xl border border-sky-200 bg-white text-sky-600 shadow-sm dark:border-sky-900 dark:bg-zinc-900 dark:text-sky-400">
          <ClipboardList className="size-5" aria-hidden="true" />
        </div>

        <h3 className="mt-4 text-base font-bold tracking-tight text-foreground">
          No interview results yet
        </h3>

        <p className="mt-1 max-w-sm text-sm leading-6 text-muted-foreground">
          Completed interview attempts for this category will appear here.
        </p>
      </CardContent>
    </Card>
  );
}