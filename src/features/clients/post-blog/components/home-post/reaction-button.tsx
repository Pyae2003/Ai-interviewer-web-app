"use client";

import { useEffect, useRef, useState } from "react";
import { ThumbsUp } from "lucide-react";
import { useAction } from "next-safe-action/hooks";

import type { ReactionType } from "@/generated/prisma/client";

import { cn } from "@/lib/utils";
import { reactPost } from "../../actions/react-post";
import { REACTIONS } from "../../query/reaction";
import { ReactionPicker } from "./reaction-picker";

type ReactionButtonProps = {
  postId: string;
  currentReaction: ReactionType | null;
  onReactionChange: (reaction: ReactionType | null) => void;
  onReactionError?: () => void;
};

const LONG_PRESS_DELAY = 450;

export function ReactionButton({
  postId,
  currentReaction,
  onReactionChange,
  onReactionError,
}: ReactionButtonProps) {
  const [showPicker, setShowPicker] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const longPressRef = useRef(false);

  const { execute, status } = useAction(reactPost, {
    onSuccess: ({ data }) => {
      if (!data) return;

      onReactionChange(data.data.reaction);
    },

    onError: () => {
      onReactionError?.();
    },
  });

  const isLoading = status === "executing";

  const selectedReaction = REACTIONS.find(
    (reaction) => reaction.type === currentReaction,
  );

  const clearLongPressTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      clearLongPressTimer();
    };
  }, []);

  const submitReaction = (type: ReactionType, toggleCurrent = true) => {
    if (isLoading) return;

    const nextReaction =
      toggleCurrent && currentReaction === type ? null : type;

    /*
     * Optimistic update.
     */
    onReactionChange(nextReaction);

    execute({
      postId,
      type,
    });
  };

  const handlePointerDown = () => {
    if (isLoading) return;

    longPressRef.current = false;

    clearLongPressTimer();

    timerRef.current = setTimeout(() => {
      longPressRef.current = true;
      setShowPicker(true);
    }, LONG_PRESS_DELAY);
  };

  const handlePointerUp = () => {
    clearLongPressTimer();
  };

  const handlePointerCancel = () => {
    clearLongPressTimer();
    longPressRef.current = false;
  };

  const handlePointerLeave = () => {
    clearLongPressTimer();
  };

  const handleClick = () => {
    if (longPressRef.current) {
      longPressRef.current = false;
      return;
    }

    /*
     * Normal Facebook-like click.
     *
     * null -> LIKE
     * LIKE -> remove
     * LOVE -> remove
     * etc.
     */
    submitReaction(currentReaction ?? "LIKE", true);
  };

  const handlePickerSelect = (type: ReactionType) => {
    /*
     * Picker selection always selects the reaction.
     */
    submitReaction(type, false);

    setShowPicker(false);
  };

  return (
    <div className="relative flex flex-1" onPointerLeave={handlePointerLeave}>
      {showPicker ? (
        <>
          <div
            className="fixed inset-0 z-40"
            aria-hidden="true"
            onPointerDown={() => setShowPicker(false)}
          />

          <div className="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2">
            <ReactionPicker
              disabled={isLoading}
              onSelect={handlePickerSelect}
            />
          </div>
        </>
      ) : null}

      <button
        type="button"
        disabled={isLoading}
        aria-label={selectedReaction?.label ?? "Like"}
        aria-pressed={Boolean(currentReaction)}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onContextMenu={(event) => event.preventDefault()}
        onClick={handleClick}
        className={cn(
          "flex h-10 w-full items-center justify-center gap-2",
          "rounded-xl text-sm font-medium",
          "transition-all duration-200",
          "hover:bg-sky-50",
          "active:scale-[0.98]",
          "dark:hover:bg-sky-950/50",
          currentReaction
            ? "text-sky-600 dark:text-sky-400"
            : "text-slate-500 dark:text-slate-400",
          isLoading && "cursor-not-allowed opacity-60",
        )}
      >
        {selectedReaction ? (
          <span className="text-lg leading-none" aria-hidden="true">
            {selectedReaction.emoji}
          </span>
        ) : (
          <ThumbsUp className="size-4" aria-hidden="true" />
        )}

        <span>{selectedReaction?.label ?? "Like"}</span>
      </button>
    </div>
  );
}
