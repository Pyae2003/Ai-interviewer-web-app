"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import type { ReactionType } from "@/generated/prisma/client";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { deletePost } from "../../actions/delete-post";
import { DeletePostDialog } from "./delete-post-dialog";
import type { HomePostProps } from "./home-post.types";
import { getActionErrorMessage } from "./home-post.utils";
import { PostEngagement } from "./post-engagement";
import { PostContent } from "./post-content";
import { PostHeader } from "./post-header";
import { PostActions } from "./post-actions";
import { ReactionSummary } from "./react-type";
import { CommentSection } from "./comment-section";

export default function HomePost({
  post,
  isOwner,
  currentUser,
  onComment,
}: HomePostProps) {
  const router = useRouter();

  const [showComments, setShowComments] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  const [deleteError, setDeleteError] = useState<string | null>(null);

  const [currentReaction, setCurrentReaction] = useState<ReactionType | null>(
    post.currentUserReaction ?? null,
  );

  const [reactionCount, setReactionCount] = useState(post.reactionCount);

  const [reactions, setReactions] = useState<ReactionSummary[]>(
    post.reactions ?? [],
  );
  const [previousReaction, setPreviousReaction] = useState<ReactionType | null>(
    post.currentUserReaction ?? null,
  );

  const [previousReactionCount, setPreviousReactionCount] = useState(
    post.reactionCount,
  );

  const [previousReactions, setPreviousReactions] = useState<ReactionSummary[]>(
    post.reactions ?? [],
  );

  const handleComment = () => {
    onComment?.(post.id);
  };
  function handleReactionChange(nextReaction: ReactionType | null) {
    setPreviousReaction(currentReaction);
    setPreviousReactionCount(reactionCount);
    setPreviousReactions(reactions);
    let nextCount = reactionCount;

    if (!currentReaction && nextReaction) {
      nextCount += 1;
    }

    if (currentReaction && !nextReaction) {
      nextCount = Math.max(0, nextCount - 1);
    }

    const nextReactions = [...reactions];
    if (currentReaction) {
      const previousIndex = nextReactions.findIndex(
        (reaction) => reaction.type === currentReaction,
      );

      if (previousIndex !== -1) {
        nextReactions[previousIndex] = {
          ...nextReactions[previousIndex],
          count: Math.max(0, nextReactions[previousIndex].count - 1),
        };
      }
    }
    if (nextReaction) {
      const nextIndex = nextReactions.findIndex(
        (reaction) => reaction.type === nextReaction,
      );

      if (nextIndex !== -1) {
        nextReactions[nextIndex] = {
          ...nextReactions[nextIndex],
          count: nextReactions[nextIndex].count + 1,
        };
      } else {
        nextReactions.push({
          type: nextReaction,
          count: 1,
        });
      }
    }

    setCurrentReaction(nextReaction);

    setReactionCount(nextCount);

    setReactions(nextReactions);
  }
  function handleReactionError() {
    setCurrentReaction(previousReaction);

    setReactionCount(previousReactionCount);

    setReactions(previousReactions);
  }

  async function handleDelete() {
    if (isDeleting) return;

    setIsDeleting(true);
    setDeleteError(null);

    try {
      const result = await deletePost({
        postId: post.id,
      });

      if (result?.validationErrors) {
        throw new Error("The post request is invalid.");
      }

      if (result?.serverError) {
        throw new Error(getActionErrorMessage(result.serverError));
      }

      setDeleteDialogOpen(false);

      router.refresh();
    } catch (error) {
      console.error("[DELETE_POST_ERROR]", error);

      setDeleteError(getActionErrorMessage(error));
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <Card className="group relative mx-2 w-[calc(100%-1rem)] max-w-[680px] overflow-hidden rounded-2xl border border-sky-100/90 bg-white/95 py-0 shadow-[0_12px_40px_-24px_rgba(14,165,233,0.5)] backdrop-blur-sm transition-[border-color,box-shadow,transform] duration-300 hover:border-sky-200 hover:shadow-[0_18px_50px_-24px_rgba(14,165,233,0.55)] dark:border-sky-900/55 dark:bg-slate-950/90 dark:shadow-[0_12px_40px_-24px_rgba(2,132,199,0.35)] dark:hover:border-sky-800/80 sm:mx-auto sm:w-full sm:rounded-3xl sm:hover:-translate-y-0.5">
        <div
          className="h-1 bg-linear-to-r from-sky-400 via-sky-500 to-blue-600"
          aria-hidden="true"
        />

        <PostHeader
          post={post}
          isOwner={isOwner}
          onDeleteRequested={() => {
            setDeleteError(null);
            setDeleteDialogOpen(true);
          }}
        />

        <PostContent caption={post.caption} images={post.images} />

        <PostEngagement
          reactionCount={reactionCount}
          commentCount={post.commentCount}
          reactions={reactions}
          onComment={handleComment}
        />

        <Separator />

        <PostActions
          postId={post.id}
          currentUserReaction={currentReaction}
          onReactionChange={handleReactionChange}
          onReactionError={handleReactionError}
          onComment={() => setShowComments((prev) => !prev)}
        />

        <Separator className="bg-sky-100/80 dark:bg-sky-900/60" />

        {showComments && (
          <CommentSection
            postId={post.id}
            currentUser={currentUser}
            initialHasMore={false}
            initialComments={post.comments}
          />
        )}
      </Card>

      {isOwner ? (
        <DeletePostDialog
          open={deleteDialogOpen}
          isDeleting={isDeleting}
          error={deleteError}
          onOpenChange={(open) => {
            if (!isDeleting) {
              setDeleteDialogOpen(open);
            }
          }}
          onConfirm={() => void handleDelete()}
        />
      ) : null}
    </>
  );
}
