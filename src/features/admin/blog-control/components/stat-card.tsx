import { LucideIcon } from "lucide-react";
import { formatCount } from "./engagement";

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
}: {
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">{formatCount(value)}</p>
          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">{description}</p>
        </div>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-950 dark:text-sky-400">
          <Icon className="size-5" aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}