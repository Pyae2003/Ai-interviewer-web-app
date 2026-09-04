"use server";

import { prisma } from "@/config";
import { getSession } from "@/lib/get-Session";
import { AppError } from "@/middleware";
import { actionClient } from "@/lib/safe-action";
import { reactionSchema } from "../schema";

export const reactPost = actionClient
  .inputSchema(reactionSchema)
  .action(async ({ parsedInput }) => {
    const { postId, type } = parsedInput;

    const session = await getSession();

    if (!session?.user?.id) {
      throw new AppError(
        "You must be logged in to react to a post",
        "UNAUTHORIZED",
        401,
      );
    }

    const userId = session.user.id;

    try {
      const post = await prisma.communityPost.findUnique({
        where: {
          id: postId,
        },
        select: {
          id: true,
        },
      });

      if (!post) {
        throw new AppError("Post not found", "POST_NOT_FOUND", 404);
      }

      const existingReaction = await prisma.postReaction.findUnique({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
        select: {
          id: true,
          type: true,
        },
      });

      if (existingReaction?.type === type) {
        await prisma.postReaction.delete({
          where: {
            id: existingReaction.id,
          },
        });

        const reactionCount = await prisma.postReaction.count({
          where: {
            postId,
          },
        });

        return {
          success: true,
          message: "Reaction removed",
          data: {
            postId,
            reaction: null,
            reactionCount,
          },
        };
      }

      if (existingReaction) {
        await prisma.postReaction.update({
          where: {
            id: existingReaction.id,
          },
          data: {
            type,
          },
        });
      } else {
        // First reaction
        await prisma.postReaction.create({
          data: {
            userId,
            postId,
            type,
          },
        });
      }

      const reactionCount = await prisma.postReaction.count({
        where: {
          postId,
        },
      });

      return {
        success: true,
        message: "Reaction updated",
        data: {
          postId,
          reaction: type,
          reactionCount,
        },
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      console.error("[REACT_POST_ERROR]", {
        postId,
        userId,
        type,
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      });

      throw new AppError(
        "Failed to update reaction",
        "REACTION_UPDATE_FAILED",
        500,
      );
    }
  });
