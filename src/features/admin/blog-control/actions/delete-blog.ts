"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/config";
import { getSession } from "@/lib/get-Session";
import { AppError } from "@/middleware";
import { actionClient } from "@/lib/safe-action";

import { adminBlogControlPath, blogPath } from "@/constants/route";
import { deletePostSchema } from "@/features/clients/post-blog/schema/delete-post.schema";

export const deletePost = actionClient
  .inputSchema(deletePostSchema)
  .action(async ({ parsedInput }) => {
    const { postId } = parsedInput;

    const session = await getSession();

    if (!session?.user?.id) {
      throw new AppError("Unauthorized", "UNAUTHORIZED", 401);
    }

    const adminId = session.user.id;

    try {
      const admin = await prisma.user.findUnique({
        where: {
          id: adminId,
        },

        select: {
          id: true,
          role: true,
        },
      });

      if (!admin) {
        throw new AppError("User not found", "USER_NOT_FOUND", 404);
      }

      if (admin.role !== "admin") {
        throw new AppError(
          "You do not have permission to delete posts",
          "FORBIDDEN",
          403,
        );
      }

      const post = await prisma.communityPost.findUnique({
        where: {
          id: postId,
        },

        select: {
          id: true,
          authorId: true,
        },
      });

      if (!post) {
        throw new AppError("Post not found", "POST_NOT_FOUND", 404);
      }

      await prisma.communityPost.delete({
        where: {
          id: post.id,
        },
      });

      revalidatePath(adminBlogControlPath);
      revalidatePath(blogPath);
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

      console.error("[ADMIN_DELETE_POST_ERROR]", {
        adminId,
        postId,
        timestamp: new Date().toISOString(),

        error: error instanceof Error ? error.message : "Unknown error",
      });

      throw new AppError("Failed to delete post", "POST_DELETE_FAILED", 500);
    }
  });
