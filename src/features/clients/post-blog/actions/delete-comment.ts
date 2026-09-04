"use server";

import { prisma } from "@/config";
import { getSession } from "@/lib/get-Session";
import { actionClient } from "@/lib/safe-action";
import { AppError } from "@/middleware";
import { deleteCommentSchema } from "../schema/delete-comment.schema";


export const deleteComment = actionClient
  .inputSchema(deleteCommentSchema)
  .action(async ({ parsedInput }) => {
    const session = await getSession();

    if (!session?.user?.id) {
      throw new AppError(
        "You must be logged in to delete a comment",
        "UNAUTHORIZED",
        401,
      );
    }

    const userId = session.user.id;
    const commentId = parsedInput.commentId;

    try {
      /*
       * Find the comment and verify ownership.
       */
      const comment = await prisma.postComment.findUnique({
        where: {
          id: commentId,
        },
        select: {
          id: true,
          userId: true,
        },
      });

      if (!comment) {
        throw new AppError(
          "Comment not found",
          "COMMENT_NOT_FOUND",
          404,
        );
      }

      /*
       * Only the comment owner can delete it.
       */
      if (comment.userId !== userId) {
        throw new AppError(
          "You are not allowed to delete this comment",
          "FORBIDDEN",
          403,
        );
      }

      await prisma.postComment.delete({
        where: {
          id: commentId,
        },
      });

      return {
        success: true,
        message: "Comment deleted successfully",
        data: {
          commentId,
        },
      };
    } catch (error) {
      console.error("[DELETE_COMMENT_ERROR]", {
        userId,
        commentId,
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : error,
      });

      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError(
        "Failed to delete comment",
        "DELETE_COMMENT_FAILED",
        500,
      );
    }
  });