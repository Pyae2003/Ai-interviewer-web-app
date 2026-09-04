"use client";

import {
  Heart,
  MessageCircle,
  Send,
} from "lucide-react";

import { Button } from "@/components/ui/button";


import type {
  ReactionType,
} from "@/generated/prisma/enums";
import { ReactionSummary } from "../home-post/home-post.types";

type PostDetailActionsProps = {
  postId: string;

  reactionCount: number;

  commentCount: number;

  reactions: ReactionSummary[];

  currentUserReaction:
    | ReactionType
    | null
    | undefined;
};

export function PostDetailActions({
  reactionCount,
  commentCount,
}: PostDetailActionsProps) {
  return (
    <div className="px-5 pt-3">
      {/* Stats */}

      <div className="flex items-center justify-between border-b border-slate-200 pb-3 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <div className="flex items-center gap-2">
          {reactionCount > 0 ? (
            <>
              <div className="flex -space-x-1">
                <div className="flex size-5 items-center justify-center rounded-full bg-sky-500">
                  👍
                </div>

                <div className="flex size-5 items-center justify-center rounded-full bg-red-500">
                  ❤️
                </div>
              </div>

              <span>
                {reactionCount}
              </span>
            </>
          ) : null}
        </div>

        <span>
          {commentCount}{" "}
          {commentCount === 1
            ? "comment"
            : "comments"}
        </span>
      </div>

      {/* Buttons */}

      <div className="grid grid-cols-3 gap-1 py-2">
        <Button
          type="button"
          variant="ghost"
          className="flex items-center gap-2 text-slate-600 dark:text-slate-300"
        >
          <Heart className="size-4" />

          <span>Like</span>
        </Button>

        <Button
          type="button"
          variant="ghost"
          className="flex items-center gap-2 text-slate-600 dark:text-slate-300"
        >
          <MessageCircle className="size-4" />

          <span>Comment</span>
        </Button>

        <Button
          type="button"
          variant="ghost"
          className="flex items-center gap-2 text-slate-600 dark:text-slate-300"
        >
          <Send className="size-4" />

          <span>Share</span>
        </Button>
      </div>
    </div>
  );
}