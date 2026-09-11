"use server";

import { prisma } from "@/config";
import { getSession } from "@/lib/get-Session";
import { AppError } from "@/middleware";
import { CommunityPost } from "../components/home-post";

export async function getPostById(id: string): Promise<{
  success: true;
  data: CommunityPost;
}> {
  if (!id?.trim()) {
    throw new AppError("Post ID is required", "POST_ID_REQUIRED", 400);
  }

  const session = await getSession();
  const userId = session?.user?.id;

  try {
    const post = await prisma.communityPost.findUnique({
      where: {
        id,
      },

      select: {
        id: true,
        caption: true,
        createdAt: true,

        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },

        images: true,

        _count: {
          select: {
            reactions: true,
            comments: true,
          },
        },

        // Current user's reaction
        reactions: userId
          ? {
              where: {
                userId,
              },
              select: {
                type: true,
              },
              take: 1,
            }
          : undefined,

        comments: {
          where: {
            parentId: null,
          },

          orderBy: {
            createdAt: "desc",
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
        },
      },
    });

    if (!post) {
      throw new AppError("Post not found", "POST_NOT_FOUND", 404);
    }

    const result: CommunityPost = {
      id: post.id,

      author: {
        id: post.author.id,
        name: post.author.name,
        image: post.author.image,
      },

      createdAt: post.createdAt.toISOString(),

      caption: post.caption,

      // string[]
      images: post.images,

      reactionCount: post._count.reactions,

      commentCount: post._count.comments,

      currentUserReaction: post.reactions?.[0]?.type ?? null,

      reactions: [],

      comments: post.comments,
    };

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("[GET_POST_BY_ID_ERROR]", {
      id,
      userId,
      error: error instanceof Error ? error.message : error,
    });

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError("Failed to load post", "GET_POST_FAILED", 500);
  }
}
