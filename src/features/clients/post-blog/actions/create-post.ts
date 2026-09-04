"use server";

import { actionClient } from "@/lib/safe-action";
import { prisma } from "@/config";
import { getSession } from "@/lib/get-Session";
import { AppError } from "@/middleware";

import { createPostSchema } from "../schema";

export const createPost = actionClient
  .inputSchema(createPostSchema)
  .action(async ({ parsedInput }) => {
    const session = await getSession();

    if (!session?.user?.id) {
      throw new AppError(
        "You must be logged in to create a post",
        "UNAUTHORIZED",
        401,
      );
    }

    const userId = session.user.id;

    const { interviewId, caption, images } = parsedInput;

    try {
      const post = await prisma.communityPost.create({
        data: {
          interviewId: interviewId,
          caption: caption,
          images: images,
          authorId: userId,
        },
      });
      return {
        success: true,

        message: "Post created successfully",

        data: {
          postId: post.id,
          createdAt: post.createdAt,
        },
      };
    } catch (error: any) {
      if (error instanceof AppError) {
        console.error("[CREATE_COMMUNITY_POST_ERROR]", {
          userId,
          interviewId,
          timestamp: new Date().toISOString(),
          error: error instanceof Error ? error.message : error,
        });

        throw new AppError(
          "Failed to create community post",
          "CREATE_POST_FAILED",
          500,
        );
      }
      throw error;
    }
  });
