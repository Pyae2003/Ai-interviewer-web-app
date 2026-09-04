"use client";

import {
  Loader2,
  MessageCircle,
} from "lucide-react";

import { CommentItem } from "./comment-item";
import type { PostCommentItem } from "./comment.type";

type CommentListProps = {
  comments: PostCommentItem[];

  currentUserId?: string;

  hasMore: boolean;
  isLoading?: boolean;

  onLoadMore: () => void;

  onStartEdit: (
    commentId: string,
  ) => void;

  onEdit: (
    commentId: string,
    content: string,
  ) => void | Promise<void>;

  onDelete: (
    commentId: string,
  ) => void | Promise<void>;

  onReply: (
    commentId: string,
  ) => void;

  editingCommentId?: string | null;
  deletingCommentId?: string | null;
};

export function CommentList({
  comments,
  currentUserId,
  hasMore,
  isLoading = false,
  onLoadMore,
  onStartEdit,
  onEdit,
  onDelete,
  onReply,
  editingCommentId = null,
  deletingCommentId = null,
}: CommentListProps) {
  if (
    comments.length === 0 &&
    !isLoading
  ) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-8 text-center">
        <div className="mb-3 flex size-11 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
          <MessageCircle className="size-5 text-slate-400" />
        </div>

        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
          No comments yet
        </p>

        <p className="mt-1 text-xs text-slate-400">
          Be the first to comment.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          currentUserId={currentUserId}
          onStartEdit={
            onStartEdit
          }
          onEdit={onEdit}
          onDelete={onDelete}
          onReply={onReply}
          isEditing={
            editingCommentId ===
            comment.id
          }
          isDeleting={
            deletingCommentId ===
            comment.id
          }
        />
      ))}

      {isLoading &&
      comments.length > 0 ? (
        <div
          className="flex items-center justify-center py-3"
          aria-live="polite"
        >
          <Loader2 className="size-4 animate-spin text-slate-400" />

          <span className="ml-2 text-xs text-slate-400">
            Loading comments...
          </span>
        </div>
      ) : null}

      {hasMore && !isLoading ? (
        <button
          type="button"
          onClick={onLoadMore}
          className="rounded-lg px-2 py-1.5 text-sm font-semibold text-slate-500 hover:bg-slate-50 hover:text-sky-600 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-sky-400"
        >
          View more comments
        </button>
      ) : null}

      {isLoading &&
      comments.length === 0 ? (
        <div
          className="flex items-center justify-center py-8"
          aria-live="polite"
        >
          <Loader2 className="size-5 animate-spin text-slate-400" />

          <span className="ml-2 text-sm text-slate-400">
            Loading comments...
          </span>
        </div>
      ) : null}
    </div>
  );
}