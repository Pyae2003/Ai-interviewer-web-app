"use server";

import { prisma } from "@/config";
import { getSession } from "@/lib/get-Session";
import { actionClient } from "@/lib/safe-action";
import { AppError } from "@/middleware";
import { updateCommentSchema } from "../schema/edit-comment.schema";


export const updateComment = actionClient
  .inputSchema(updateCommentSchema)
  .action(async ({ parsedInput }) => {
    const session = await getSession();

    if (!session?.user?.id) {
      throw new AppError(
        "You must be logged in to edit a comment",
        "UNAUTHORIZED",
        401,
      );
    }

    const userId = session.user.id;
    const commentId = parsedInput.commentId;
    const content = parsedInput.content.trim();

    try {
      /*
       * Validate after trimming.
       */
      if (!content) {
        throw new AppError(
          "Comment cannot be empty",
          "INVALID_COMMENT",
          400,
        );
      }

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
       * Only the comment owner can edit it.
       */
      if (comment.userId !== userId) {
        throw new AppError(
          "You are not allowed to edit this comment",
          "FORBIDDEN",
          403,
        );
      }


      const updatedComment = await prisma.postComment.update({
        where: {
          id: commentId,
        },
        data: {
          content,
        },
        select: {
          id: true,
          content: true,
          createdAt: true,
          updatedAt: true,
          parentId:true,


          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });

      return {
        success: true,
        message: "Comment updated successfully",
        data: updatedComment,
      };
    } catch (error) {
      console.error("[UPDATE_COMMENT_ERROR]", {
        userId,
        commentId,
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : error,
      });

      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError(
        "Failed to update comment",
        "UPDATE_COMMENT_FAILED",
        500,
      );
    }
  });