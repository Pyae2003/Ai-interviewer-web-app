"use client";

import { useState } from "react";

import { CommentComposer } from "./comment-composer";
import { CommentList } from "./comment-list";
import type { PostCommentItem } from "./comment.type";

import { createComment } from "../../actions/create-comment";
import { deleteComment } from "../../actions/delete-comment";
import { updateComment } from "../../actions/edit-comment";
import { AppError } from "@/middleware";

type CommentSectionProps = {
  postId: string;

  currentUser?: {
    id: string;
    name?: string | null;
    image?: string | null;
  } | null;

  initialComments?: PostCommentItem[];
  initialHasMore?: boolean;
};

export function CommentSection({
  postId,
  currentUser,
  initialComments = [],
  initialHasMore = false,
}: CommentSectionProps) {
  const [comments, setComments] = useState<PostCommentItem[]>(initialComments);

  const [hasMore, setHasMore] = useState(initialHasMore);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(
    null,
  );

  /*
   * =========================================
   * EDIT
   * =========================================
   */

  function handleStartEdit(commentId: string) {
    setEditingCommentId(commentId || null);
  }

  async function handleEdit(commentId: string, content: string) {
    if (!currentUser || !editingCommentId) {
      return;
    }

    const trimmedContent = content.trim();

    if (!trimmedContent) {
      return;
    }

    try {
      const result = await updateComment({
        commentId,
        content: trimmedContent,
      });

      if (result?.validationErrors) {
        throw new Error("Invalid comment");
      }

      if (result?.serverError) {
        throw new AppError(
          result.serverError.message,
          "UPDATE_COMMENT_SERVER_ERROR",
          500,
        );
      }

      const updatedComment = result?.data?.data;

      if (!updatedComment) {
        throw new Error("Updated comment was not returned");
      }

      setComments((current) =>
        current.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                ...updatedComment,
              }
            : comment,
        ),
      );

      setEditingCommentId(null);
    } catch (error) {
      console.error("[UPDATE_COMMENT_ERROR]", {
        commentId,
        error,
      });

      throw error;
    }
  }

  /*
   * =========================================
   * CREATE COMMENT
   * =========================================
   */

  async function handleCreateComment(content: string) {
    if (!currentUser || isSubmitting) {
      return;
    }

    const trimmedContent = content.trim();

    if (!trimmedContent) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createComment({
        postId,
        content: trimmedContent,
      });

      if (result?.validationErrors) {
        console.error(
          "[CREATE_COMMENT_VALIDATION_ERROR]",
          result.validationErrors,
        );

        throw new Error("Invalid comment");
      }

      if (result?.serverError) {
        console.error("[CREATE_COMMENT_SERVER_ERROR]", result.serverError);

        throw new AppError(
          result.serverError.message,
          "CREATE_COMMENT_SERVER_ERROR",
          500,
        );
      }

      const newComment = result?.data?.data;

      if (!newComment) {
        throw new Error("Created comment was not returned");
      }

      // Newest comment first
      setComments((current) => [newComment, ...current]);
    } catch (error) {
      console.error("[CREATE_COMMENT_ERROR]", {
        postId,
        error,
      });

      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }

  /*
   * =========================================
   * DELETE
   * =========================================
   */

  async function handleDelete(commentId: string) {
    if (!currentUser || deletingCommentId) {
      return;
    }

    setDeletingCommentId(commentId);

    try {
      const result = await deleteComment({
        commentId,
      });

      if (result?.validationErrors) {
        throw new Error("Invalid comment");
      }

      if (result?.serverError) {
        throw new AppError(
          result.serverError.message,
          "DELETE_COMMENT_SERVER_ERROR",
          500,
        );
      }

      setComments((current) =>
        current.filter((comment) => comment.id !== commentId),
      );
    } catch (error) {
      console.error("[DELETE_COMMENT_ERROR]", {
        commentId,
        error,
      });

      throw error;
    } finally {
      setDeletingCommentId(null);
    }
  }

  /*
   * =========================================
   * REPLY
   * =========================================
   */

  function handleReply(commentId: string) {
    console.log("Reply to:", commentId);

    // Later connect replyingTo state here.
  }

  /*
   * =========================================
   * PAGINATION
   * =========================================
   */

  async function handleLoadMore() {
    if (isLoadingMore || !hasMore) {
      return;
    }

    setIsLoadingMore(true);

    try {
      /*
       * Connect cursor-based
       * getComments action here.
       */
    } catch (error) {
      console.error("[LOAD_MORE_COMMENTS_ERROR]", {
        postId,
        error,
      });
    } finally {
      setIsLoadingMore(false);
    }
  }

  return (
    <section className="border-t border-slate-100 px-4 py-4 dark:border-slate-800 sm:px-5">
      {/* =========================================
          COMMENT COMPOSER
          ========================================= */}

      {currentUser ? (
        <CommentComposer
          user={currentUser}
          onSubmit={handleCreateComment}
          isSubmitting={isSubmitting}
        />
      ) : (
        <div className="mb-4 rounded-xl bg-slate-50 px-4 py-3 text-center dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Sign in to join the conversation.
          </p>
        </div>
      )}

      <div className="mt-5">
        <CommentList
          comments={comments}
          currentUserId={currentUser?.id}

          hasMore={hasMore}
          isLoading={isLoadingMore}

          onLoadMore={handleLoadMore}

          onStartEdit={handleStartEdit}

          onEdit={handleEdit}

          onDelete={handleDelete}

          onReply={handleReply}

          editingCommentId={editingCommentId}

          deletingCommentId={deletingCommentId}
        />
      </div>
    </section>
  );
}
