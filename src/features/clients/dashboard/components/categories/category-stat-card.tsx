"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
const countFormatter = new Intl.NumberFormat("en-US");


const statColorStyles = {
  sky: {
    container:
      "border-sky-200/80 bg-sky-50/70 hover:bg-sky-100/70 dark:border-sky-900/60 dark:bg-sky-950/35 dark:hover:bg-sky-950/55",
    icon:
      "border-sky-200 bg-white text-sky-600 dark:border-sky-900 dark:bg-zinc-900 dark:text-sky-400",
  },
  violet: {
    container:
      "border-violet-200/80 bg-violet-50/70 hover:bg-violet-100/70 dark:border-violet-900/60 dark:bg-violet-950/35 dark:hover:bg-violet-950/55",
    icon:
      "border-violet-200 bg-white text-violet-600 dark:border-violet-900 dark:bg-zinc-900 dark:text-violet-400",
  },
} as const;

type StatColor = keyof typeof statColorStyles;

type CategoryStatCardProps = {
  icon: LucideIcon;
  label: string;
  value: number;
  color: StatColor;
};

export function CategoryStatCard({
  icon: Icon,
  label,
  value,
  color,
}: CategoryStatCardProps) {
  const styles = statColorStyles[color];
  const safeValue = Number.isFinite(value)
    ? Math.max(0, Math.floor(value))
    : 0;

  return (
    <div
      className={cn(
        "rounded-2xl border p-4 transition-[background-color,transform] duration-200 hover:-translate-y-0.5",
        styles.container,
      )}
    >
      <div
        className={cn(
          "mb-3 flex size-9 items-center justify-center rounded-xl border shadow-sm",
          styles.icon,
        )}
      >
        <Icon className="size-4" aria-hidden="true" />
      </div>

      <p className="text-2xl font-bold tracking-tight text-foreground">
        {countFormatter.format(safeValue)}
      </p>

      <p className="mt-0.5 text-xs font-medium text-muted-foreground">
        {label}
      </p>
    </div>
  );
}