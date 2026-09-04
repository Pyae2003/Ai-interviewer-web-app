"use server";

import { prisma } from "@/config";
import { getSession } from "@/lib/get-Session";
import { AppError } from "@/middleware";
import { actionClient } from "@/lib/safe-action";
import { deletePostSchema } from "../schema/delete-post.schema";
import { revalidatePath } from "next/cache";
import { adminBlogControlPath } from "@/constants/route";


export const deletePost = actionClient
  .inputSchema(deletePostSchema)
  .action(async ({ parsedInput }) => {
    const { postId } = parsedInput;

    const session = await getSession();

    if (!session?.user?.id) {
      throw new AppError("Unauthorized", "UNAUTHORIZED", 401);
    }

    const userId = session.user.id;

    try {

      const post = await prisma.communityPost.findFirst({
        where: {
          id: postId,
          authorId: userId,
        },

        select: {
          id: true,
          authorId: true,
        },
      });

      if (!post) {
        throw new AppError("Post not found", "POST_NOT_FOUND", 404);
      }

      await prisma.$transaction(async (tx) => {

        await tx.postReaction.deleteMany({
          where: {
            postId: post.id,
          },
        });

        await tx.postComment.deleteMany({
          where: {
            postId: post.id,
          },
        });

        await tx.communityPost.delete({
          where: {
            id: post.id,
          },
        });
      });

      return {
        success: true,

        message: "Post deleted successfully",

        data: {
          postId: post.id,
        },
      };
    } catch (error) {

      if (error instanceof AppError) {
        throw error;
      }

      console.error("[DELETE_POST_ERROR]", {
        postId,
        userId,
        timestamp: new Date().toISOString(),

        error: error instanceof Error ? error.message : "Unknown error",
      });

      throw new AppError("Failed to delete post", "POST_DELETE_FAILED", 500);
    };

  },
  revalidatePath(adminBlogControlPath)

);
