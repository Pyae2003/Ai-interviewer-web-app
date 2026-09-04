import { Search } from "lucide-react";

export function EmptyState({ hasSearch }: { hasSearch: boolean }) {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-sky-50 text-sky-500 dark:bg-sky-950 dark:text-sky-400">
        <Search className="size-6" aria-hidden="true" />
      </span>
      <p className="mt-4 font-semibold text-slate-900 dark:text-white">
        {hasSearch ? "No matching blogs" : "No blogs yet"}
      </p>
      <p className="mt-1 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
        {hasSearch
          ? "Try a different caption, author name, or email address."
          : "Community blogs will appear here after users publish them."}
      </p>
    </div>
  );
}