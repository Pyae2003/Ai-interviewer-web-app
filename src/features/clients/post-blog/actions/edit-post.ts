"use server";

import { prisma } from "@/config";
import { getSession } from "@/lib/get-Session";
import { AppError } from "@/middleware";
import { actionClient } from "@/lib/safe-action";
import { editPostSchema } from "../schema/edit-post.schema";

export const editPost = actionClient
  .inputSchema(editPostSchema)
  .action(async ({ parsedInput }) => {
    const session = await getSession();

    if (!session?.user?.id) {
      throw new AppError(
        "You must be logged in to edit a post",
        "UNAUTHORIZED",
        401,
      );
    }

    const userId = session.user.id;

    const { postId, caption, images } = parsedInput;

    try {
      const existingPost = await prisma.communityPost.findFirst({
        where: {
          id: postId,
          authorId: userId,
        },
        select: {
          id: true,
        },
      });

      if (!existingPost) {
        throw new AppError(
          "Post not found or you do not have permission to edit it",
          "POST_NOT_FOUND",
          404,
        );
      }

      // 3. Update post + replace images atomically
      const post = await prisma.communityPost.update({
        where: {
          id: existingPost.id,
        },
        data: {
          caption,
          images,
        },
        select: {
          id: true,
          updatedAt: true,
        },
      });

      return {
        success: true,
        message: "Post updated successfully",
        data: {
          postId: post.id,
          updatedAt: post.updatedAt,
        },
      };
    } catch (error) {
      // Don't expose internal errors
      if (error instanceof AppError) {
        throw error;
      }

      console.error("[EDIT_COMMUNITY_POST_ERROR]", {
        userId,
        postId,
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      });

      throw new AppError(
        "Failed to update community post",
        "UPDATE_POST_FAILED",
        500,
      );
    }
  });
