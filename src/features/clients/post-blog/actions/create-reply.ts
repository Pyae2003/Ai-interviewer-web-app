"use server";

import { prisma } from "@/config";
import { getSession } from "@/lib/get-Session";
import { actionClient } from "@/lib/safe-action";
import { AppError } from "@/middleware";

import { createReplySchema } from "../schema";

export const createReply = actionClient
  .inputSchema(createReplySchema)
  .action(async ({ parsedInput }) => {
    const session = await getSession();

    if (!session?.user?.id) {
      throw new AppError(
        "You must be logged in to reply",
        "UNAUTHORIZED",
        401,
      );
    }

    const userId = session.user.id;
    const postId = parsedInput.postId;
    const parentId = parsedInput.parentId;
    const content = parsedInput.content.trim();

    try {
      if (!content) {
        throw new AppError(
          "Reply cannot be empty",
          "INVALID_REPLY",
          400,
        );
      }

      /*
       * Make sure the parent comment exists
       * and belongs to the same post.
       */
      const parentComment =
        await prisma.postComment.findUnique({
          where: {
            id: parentId,
          },
          select: {
            id: true,
            postId: true,
          },
        });

      if (!parentComment) {
        throw new AppError(
          "Parent comment not found",
          "PARENT_COMMENT_NOT_FOUND",
          404,
        );
      }

      /*
       * Prevent replying to a comment
       * from another post.
       */
      if (parentComment.postId !== postId) {
        throw new AppError(
          "Comment does not belong to this post",
          "INVALID_PARENT_COMMENT",
          400,
        );
      }

      /*
       * Create reply.
       */
      const reply = await prisma.postComment.create({
        data: {
          content,
          postId,
          userId,
          parentId,
        },

        select: {
          id: true,
          content: true,
          createdAt: true,
          updatedAt: true,
          parentId: true,

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
        message: "Reply created successfully",
        data: reply,
      };
    } catch (error) {
      console.error("[CREATE_REPLY_ERROR]", {
        userId,
        postId,
        parentId,
        timestamp: new Date().toISOString(),
        error:
          error instanceof Error
            ? error.message
            : error,
      });

      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError(
        "Failed to create reply",
        "CREATE_REPLY_FAILED",
        500,
      );
    }
  });