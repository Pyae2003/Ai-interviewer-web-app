"use client";

import {
  Bookmark,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

import type { ReactionType } from "@/generated/prisma/client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { detailsBlogPath } from "@/constants/route";

import { ReactionButton } from "./reaction-button";

type PostActionsProps = {
  postId: string;
  currentUserReaction: ReactionType | null;

  onReactionChange: (
    reaction: ReactionType | null,
  ) => void;

  onReactionError?: () => void;

  onComment: () => void;
};

const actionClassName =
  "h-10 gap-2 rounded-xl text-slate-500 transition-all duration-200 hover:bg-sky-50 hover:text-sky-700 dark:text-slate-400 dark:hover:bg-sky-950/50 dark:hover:text-sky-300";

export function PostActions({
  postId,
  currentUserReaction,
  onReactionChange,
  onReactionError,
  onComment,
}: PostActionsProps) {
  return (
    <div className="grid grid-cols-3 gap-1.5 bg-sky-50/25 px-2 py-1.5 dark:bg-sky-950/10 sm:px-3">
      <ReactionButton
        postId={postId}
        currentReaction={currentUserReaction}
        onReactionChange={onReactionChange}
        onReactionError={onReactionError}
      />

      <Button
        type="button"
        variant="ghost"
        onClick={onComment}
        className={actionClassName}
      >
        <MessageCircle
          className="size-4"
          aria-hidden="true"
        />
        <span>Comment</span>
      </Button>

      <Link
        href={detailsBlogPath(postId)}
        className="text-center"
      >
        <Button
          type="button"
          variant="ghost"
          className={cn(
            actionClassName,
            "w-full",
          )}
        >
          <Bookmark
            className="size-4"
            aria-hidden="true"
          />

          <span>Detail</span>
        </Button>
      </Link>
    </div>
  );
}