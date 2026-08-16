import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type InterviewStatProps = Readonly<{
  icon: LucideIcon;
  label: string;
  value: number;
  tone: "violet" | "emerald";
}>;

const toneClasses = {
  violet: {
    container:
      "border-violet-100 bg-violet-50/70 dark:border-violet-900/60 dark:bg-violet-950/30",
    icon: "border-violet-200 bg-white text-violet-600 dark:border-violet-900 dark:bg-zinc-900 dark:text-violet-400",
  },
  emerald: {
    container:
      "border-emerald-100 bg-emerald-50/70 dark:border-emerald-900/60 dark:bg-emerald-950/30",
    icon: "border-emerald-200 bg-white text-emerald-600 dark:border-emerald-900 dark:bg-zinc-900 dark:text-emerald-400",
  },
} as const;

export function InterviewStat({
  icon: Icon,
  label,
  value,
  tone,
}: InterviewStatProps) {
  const classes = toneClasses[tone];

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border p-3",
        classes.container,
      )}
    >
      <div
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-lg border shadow-sm",
          classes.icon,
        )}
      >
        <Icon className="size-4" aria-hidden="true" />
      </div>

      <div className="min-w-0">
        <p className="text-xl font-bold tracking-tight text-foreground">
          {value}
        </p>

        <p className="truncate text-xs font-medium text-muted-foreground">
          {label}
        </p>
      </div>
    </div>
  );
}