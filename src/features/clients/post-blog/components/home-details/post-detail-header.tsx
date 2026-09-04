"use client";

import { MoreHorizontal } from "lucide-react";

type PostDetailHeaderProps = {
  author: {
    id: string;
    name: string | null;
    image: string | null;
  };

  createdAt: string;
};

function formatPostTime(date: string) {
  const value = new Date(date);

  const diff =
    Date.now() - value.getTime();

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < minute) {
    return "Just now";
  }

  if (diff < hour) {
    return `${Math.floor(diff / minute)}m`;
  }

  if (diff < day) {
    return `${Math.floor(diff / hour)}h`;
  }

  if (diff < 7 * day) {
    return `${Math.floor(diff / day)}d`;
  }

  return value.toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
    },
  );
}

export function PostDetailHeader({
  author,
  createdAt,
}: PostDetailHeaderProps) {
  const name =
    author.name?.trim() || "Anonymous";

  const initial =
    name.charAt(0).toUpperCase();

  return (
    <header className="flex items-center justify-between px-5 pt-5">
      <div className="flex items-center gap-3">
        {author.image ? (
          <img
            src={author.image}
            alt={name}
            className="size-11 rounded-full object-cover"
          />
        ) : (
          <div className="flex size-11 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-700 dark:bg-sky-950 dark:text-sky-300">
            {initial}
          </div>
        )}

        <div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
            {name}
          </h2>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            {formatPostTime(createdAt)}
          </p>
        </div>
      </div>

      <button
        type="button"
        className="flex size-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        <MoreHorizontal className="size-5" />
      </button>
    </header>
  );
}