import { formatPostDate } from "@/features/clients/post-blog/components/home-post/home-post.utils";
import { CalendarDays } from "lucide-react";

export function PostDate({ createdAt, compact = false }: { createdAt: Date | string; compact?: boolean }) {
  return (
    <div className="flex items-center gap-1.5 whitespace-nowrap text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
      <CalendarDays className="size-4" aria-hidden="true" />
      <span className={compact ? "sr-only sm:not-sr-only" : undefined}>
        {formatPostDate(createdAt.toString())}
      </span>
    </div>
  );
}