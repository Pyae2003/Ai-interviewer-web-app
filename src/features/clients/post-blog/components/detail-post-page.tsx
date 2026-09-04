"use client";

import { useCallback, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ReactionType } from "@/generated/prisma/enums";

import { CommunityPost } from "./home-post";
import { CommentSection } from "./home-post/comment-section";
import { PostActions } from "./home-post/post-actions";
import { PostEngagement } from "./home-post/post-engagement";
import { ReactionSummary } from "./home-post/home-post.types";
import { getActionErrorMessage } from "./home-post/home-post.utils";

import { PostDetailHeader } from "./home-details/post-detail-header";
import { PostDetailContent } from "./home-details/post-detail-content";

import { deletePost } from "../actions/delete-post";

type PostDetailPageProps = {
  post: CommunityPost;

  currentUser?: {
    id: string;
    name?: string | null;
    image?: string | null;
  } | null;

  onBack?: () => void;
  onComment?: (postId: string) => void;
};

export function PostDetailPage({
  post,
  currentUser,
  onBack,
  onComment,
}: PostDetailPageProps) {
  const router = useRouter();


  const [showComments, setShowComments] = useState(true);

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const [currentReaction, setCurrentReaction] =
    useState<ReactionType | null>(post.currentUserReaction ?? null);

  const [reactionCount, setReactionCount] = useState(post.reactionCount);

  const [reactions, setReactions] = useState<ReactionSummary[]>(
    post.reactions ?? [],
  );

  /* -------------------------------------------------------------------------- */
  /*                              Reaction Logic                                */
  /* -------------------------------------------------------------------------- */

  const handleReactionChange = useCallback(
    (nextReaction: ReactionType | null) => {
      setCurrentReaction((previousReaction) => {
        return nextReaction;
      });

      setReactionCount((previousCount) => {
        if (!currentReaction && nextReaction) {
          return previousCount + 1;
        }

        if (currentReaction && !nextReaction) {
          return Math.max(0, previousCount - 1);
        }

        return previousCount;
      });

      setReactions((previousReactions) => {
        const updated = previousReactions.map((reaction) => {
          if (reaction.type === currentReaction && currentReaction) {
            return {
              ...reaction,
              count: Math.max(0, reaction.count - 1),
            };
          }

          if (reaction.type === nextReaction && nextReaction) {
            return {
              ...reaction,
              count: reaction.count + 1,
            };
          }

          return reaction;
        });

        // Add new reaction type if it didn't exist before.
        if (
          nextReaction &&
          !previousReactions.some(
            (reaction) => reaction.type === nextReaction,
          )
        ) {
          updated.push({
            type: nextReaction,
            count: 1,
          });
        }

        return updated.filter((reaction) => reaction.count > 0);
      });
    },
    [currentReaction],
  );

  /**
   * If the server action fails, reload the original
   * reaction state from the post.
   */
  const handleReactionError = useCallback(() => {
    setCurrentReaction(post.currentUserReaction ?? null);
    setReactionCount(post.reactionCount);
    setReactions(post.reactions ?? []);
  }, [post]);

  /* -------------------------------------------------------------------------- */
  /*                              Comment Logic                                 */
  /* -------------------------------------------------------------------------- */

  const handleComment = useCallback(() => {
    setShowComments((previous) => !previous);

    onComment?.(post.id);
  }, [onComment, post.id]);

  /* -------------------------------------------------------------------------- */
  /*                               Delete Logic                                 */
  /* -------------------------------------------------------------------------- */

  const handleDelete = useCallback(async () => {
    if (isDeleting) return;

    setIsDeleting(true);
    setDeleteError(null);

    try {
      const result = await deletePost({
        postId: post.id,
      });

      if (result?.validationErrors) {
        throw new Error("Invalid post deletion request.");
      }

      if (result?.serverError) {
        throw new Error(getActionErrorMessage(result.serverError));
      }

      setDeleteDialogOpen(false);

      /**
       * Refresh server components after successful deletion.
       *
       * If the parent owns the post list, an even better approach
       * is to expose an onDeleted callback and remove the post
       * optimistically from the parent list.
       */
      router.refresh();
      router.back();
    } catch (error) {
      console.error("[DELETE_POST_ERROR]", {
        postId: post.id,
        error,
      });

      setDeleteError(getActionErrorMessage(error));
    } finally {
      setIsDeleting(false);
    }
  }, [isDeleting, post.id, router]);

  /* -------------------------------------------------------------------------- */
  /*                                Navigation                                  */
  /* -------------------------------------------------------------------------- */

  const handleBack = useCallback(() => {
    if (onBack) {
      onBack();
      return;
    }

    router.back();
  }, [onBack, router]);

  /* -------------------------------------------------------------------------- */
  /*                                   Render                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <main className="min-h-dvh bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-3xl px-3 py-3 sm:px-5 sm:py-6 lg:px-6">
        {/* ------------------------------------------------------------------ */}
        {/* Header                                                             */}
        {/* ------------------------------------------------------------------ */}

        <header className="mb-3 flex items-center gap-2 sm:mb-5 sm:gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleBack}
            aria-label="Go back"
            className="size-9 shrink-0 rounded-full sm:size-10"
          >
            <ArrowLeft className="size-5" />
          </Button>

          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold text-slate-900 dark:text-white sm:text-lg">
              Post
            </h1>

            <p className="hidden text-xs text-slate-500 sm:block dark:text-slate-400">
              Community post
            </p>
          </div>
        </header>

        {/* ------------------------------------------------------------------ */}
        {/* Post                                                               */}
        {/* ------------------------------------------------------------------ */}

        <article
          aria-label="Community post"
          className="
            overflow-hidden
            rounded-xl
            border
            border-slate-200
            bg-white
            shadow-sm
            sm:rounded-2xl
            dark:border-slate-800
            dark:bg-slate-900
          "
        >
          {/* Post Header */}
          <PostDetailHeader
            author={post.author}
            createdAt={post.createdAt}
          />

          {/* Post Content */}
          <PostDetailContent
            caption={post.caption}
            images={post.images}
          />

          {/* Engagement Summary */}
          <PostEngagement
            reactionCount={reactionCount}
            commentCount={post.commentCount}
            reactions={reactions}
            onComment={handleComment}
          />

          {/* Actions */}
          <PostActions
            postId={post.id}
            currentUserReaction={currentReaction}
            onReactionChange={handleReactionChange}
            onReactionError={handleReactionError}
            onComment={() => setShowComments((previous) => !previous)}
          />

          {/* Comments */}
          {showComments && (
            <section
              aria-label="Comments"
              className="border-t border-slate-100 dark:border-slate-800"
            >
              <CommentSection
                postId={post.id}
                currentUser={currentUser}
                initialComments={post.comments ?? []}
                initialHasMore={false}
              />
            </section>
          )}
        </article>

        {/* ------------------------------------------------------------------ */}
        {/* Delete Error                                                       */}
        {/* ------------------------------------------------------------------ */}

        {deleteError && (
          <div
            role="alert"
            className="
              mt-3
              rounded-lg
              border
              border-red-200
              bg-red-50
              px-4
              py-3
              text-sm
              text-red-700
              dark:border-red-900
              dark:bg-red-950/40
              dark:text-red-300
            "
          >
            {deleteError}
          </div>
        )}
      </div>
    </main>
  );
}

