"use client";

import {
  KeyboardEvent,
  useRef,
  useState,
} from "react";

import {
  Loader2,
  Send,
  Smile,
} from "lucide-react";

type CommentComposerProps = {
  user?: {
    name?: string | null;
    image?: string | null;
  } | null;

  onSubmit: (
    content: string,
  ) => void | Promise<void>;

  isSubmitting?: boolean;

  placeholder?: string;
};

export function CommentComposer({
  user,
  onSubmit,
  isSubmitting = false,
  placeholder = "Write a comment...",
}: CommentComposerProps) {
  const [value, setValue] =
    useState("");

  const textareaRef =
    useRef<HTMLTextAreaElement>(null);

  async function submit() {
    const content =
      value.trim();

    if (
      !content ||
      isSubmitting
    ) {
      return;
    }

    try {
      await onSubmit(content);

      /*
       * Clear only after submit
       * finishes successfully.
       */
      setValue("");

      requestAnimationFrame(() => {
        textareaRef.current?.focus();
      });
    } catch (error) {
      console.error(
        "[COMMENT_COMPOSER_ERROR]",
        error,
      );
    }
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      void submit();
    }
  }

  const userName =
    user?.name?.trim() ||
    "User";

  const initial =
    userName.charAt(0).toUpperCase();

  return (
    <div className="flex gap-2.5">
      {/* Avatar */}
      <div className="shrink-0">
        {user?.image ? (
          <img
            src={user.image}
            alt={`${userName}'s avatar`}
            className="size-9 rounded-full object-cover"
          />
        ) : (
          <div className="flex size-9 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-sky-700 dark:bg-sky-900/50 dark:text-sky-300">
            {initial}
          </div>
        )}
      </div>

      {/* Composer */}
      <div className="min-w-0 flex-1">
        <div className="flex items-end rounded-2xl bg-slate-100 px-3 py-2 dark:bg-slate-800">
          <textarea
            ref={textareaRef}
            value={value}
            disabled={isSubmitting}
            onChange={(event) =>
              setValue(
                event.target.value,
              )
            }
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={1}
            maxLength={2000}
            className="max-h-28 min-h-6 flex-1 resize-none bg-transparent py-0.5 pr-2 text-sm leading-6 text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100"
          />

          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              disabled={isSubmitting}
              aria-label="Add emoji"
              className="flex size-7 items-center justify-center rounded-full text-slate-400 hover:bg-slate-200 hover:text-sky-600 disabled:opacity-40 dark:hover:bg-slate-700"
            >
              <Smile className="size-4" />
            </button>

            <button
              type="button"
              disabled={
                !value.trim() ||
                isSubmitting
              }
              onClick={() =>
                void submit()
              }
              aria-label="Send comment"
              className="flex size-7 items-center justify-center rounded-full text-sky-600 hover:bg-sky-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-sky-400 dark:hover:bg-sky-950/50"
            >
              {isSubmitting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Send className="size-4" />
              )}
            </button>
          </div>
        </div>

        <div className="mt-1 px-2 text-[10px] text-slate-400">
          Press Enter to comment · Shift +
          Enter for new line
        </div>
      </div>
    </div>
  );
}