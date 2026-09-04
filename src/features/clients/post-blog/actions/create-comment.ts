"use server";

import { prisma } from "@/config";
import { getSession } from "@/lib/get-Session";
import { actionClient } from "@/lib/safe-action";
import { AppError } from "@/middleware";

import { createCommentSchema } from "../schema";

export const createComment = actionClient
  .inputSchema(createCommentSchema)
  .action(async ({ parsedInput }) => {
    const session = await getSession();

    if (!session?.user?.id) {
      throw new AppError(
        "You must be logged in to comment",
        "UNAUTHORIZED",
        401,
      );
    }

    const userId = session.user.id;
    const postId = parsedInput.postId;
    const content = parsedInput.content.trim();

    try {
      // 1. Validate content again after trim
      if (!content) {
        throw new AppError("Comment cannot be empty", "INVALID_COMMENT", 400);
      }

      // 2. Check whether the post exists
      const postExists = await prisma.communityPost.findUnique({
        where: {
          id: postId,
        },
        select: {
          id: true,
        },
      });

      if (!postExists) {
        throw new AppError("Post not found", "POST_NOT_FOUND", 404);
      }

      const comment = await prisma.postComment.create({
        data: {
          content,
          postId,
          userId,
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
        message: "Comment created successfully",
        data: comment,
      };
    } catch (error) {
      console.error("[CREATE_COMMENT_ERROR]", {
        userId,
        postId,
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : error,
      });

      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError(
        "Failed to create comment",
        "CREATE_COMMENT_FAILED",
        500,
      );
    }
  });
