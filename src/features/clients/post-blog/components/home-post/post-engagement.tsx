import { MessageCircle } from "lucide-react";

import type { ReactionType } from "@/generated/prisma/client";

import { formatCount } from "./home-post.utils";
import { ReactionSummary } from "./react-type";

type PostEngagementProps = {
  reactionCount: number;
  commentCount: number;
  reactions: ReactionSummary[];
  onComment: () => void;
};

const REACTION_EMOJI: Record<ReactionType, string> = {
  LIKE: "👍",
  LOVE: "❤️",
  HAHA: "😂",
  WOW: "😮",
  SAD: "😢",
  ANGRY: "😡",
};

export function PostEngagement({
  reactionCount,
  commentCount,
  reactions,
  onComment,
}: PostEngagementProps) {
  const visibleReactions = [...reactions]
    .filter((reaction) => reaction.count > 0)
    .sort((a, b) => {
      if (b.count !== a.count) {
        return b.count - a.count;
      }

      return a.type.localeCompare(b.type);
    })
    .slice(0, 3);

  return (
    <div className="flex min-h-11 items-center justify-between gap-3 px-4 py-2.5 text-[13px] text-slate-500 dark:text-slate-400 sm:px-5">
      <div
        className="flex min-w-0 items-center gap-2"
        title={`${reactionCount.toLocaleString("en-US")} reactions`}
      >
        {reactionCount > 0 ? (
          <>
            <span className="flex -space-x-1" aria-hidden="true">
              {visibleReactions.map((reaction) => (
                <span
                  key={reaction.type}
                  className="relative flex size-5 items-center justify-center rounded-full border-2 border-white bg-white text-[11px] shadow-xs dark:border-slate-950 dark:bg-slate-900"
                >
                  {REACTION_EMOJI[reaction.type]}
                </span>
              ))}
            </span>

            <span
              className="truncate"
              title={reactionCount.toLocaleString("en-US")}
            >
              {formatCount(reactionCount)}
            </span>
          </>
        ) : (
          <span className="text-slate-400 dark:text-slate-500">
            No reactions
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={onComment}
        className="flex shrink-0 items-center gap-1.5 rounded-md transition-colors hover:text-sky-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:hover:text-sky-300 dark:focus-visible:ring-offset-slate-950"
        aria-label={`View ${commentCount} ${
          commentCount === 1 ? "comment" : "comments"
        }`}
      >
        <MessageCircle className="size-3.5" aria-hidden="true" />

        <span title={commentCount.toLocaleString("en-US")}>
          {formatCount(commentCount)}{" "}
          {commentCount === 1 ? "comment" : "comments"}
        </span>
      </button>
    </div>
  );
}
