"use server";

import { prisma } from "@/config";
import { getSession } from "@/lib/get-Session";
import { AppError } from "@/middleware";
import { CommunityPost } from "../components/home-post";
import { ReactionType } from "@/generated/prisma/enums";

type ResponseGetAllPosts = {
  success: true;
  data: CommunityPost[];
};

export async function getAllPosts(): Promise<ResponseGetAllPosts> {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new AppError(
      "You must be logged in to view community posts",
      "UNAUTHORIZED",
      401,
    );
  }

  const userId = session.user.id;

  try {
    const [posts, totalPosts] = await prisma.$transaction([
      /*
       * =========================================
       * GET POSTS
       * =========================================
       */
      prisma.communityPost.findMany({
        orderBy: {
          createdAt: "desc",
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

    
          reactions: {
            where: {
              userId,
            },

            select: {
              type: true,
            },

            take: 1,
          },
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

              replies: {
                orderBy: {
                  createdAt: "asc",
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
          },
        },
      }),

      prisma.communityPost.count(),
    ]);

  
    const reactionGroups =
      await prisma.postReaction.groupBy({
        by: ["postId", "type"],

        _count: {
          type: true,
        },
      });
    const reactionMap = new Map<
      string,
      Map<ReactionType, number>
    >();

    for (const reaction of reactionGroups) {
      if (!reactionMap.has(reaction.postId)) {
        reactionMap.set(
          reaction.postId,
          new Map<ReactionType, number>(),
        );
      }

      reactionMap
        .get(reaction.postId)!
        .set(
          reaction.type,
          reaction._count.type,
        );
    }

    /*
     * =========================================
     * FORMAT POSTS
     * =========================================
     */
    const formattedPosts: CommunityPost[] =
      posts.map((post) => {
        const postReactionMap =
          reactionMap.get(post.id);

        const reactions = postReactionMap
          ? Array.from(
              postReactionMap.entries(),
            ).map(([type, count]) => ({
              type,
              count,
            }))
          : [];

        return {
          id: post.id,

       
          author: {
            id: post.author.id,
            name: post.author.name,
            image: post.author.image,
          },
          createdAt:
            post.createdAt.toISOString(),

          caption: post.caption,
          images: post.images,

          reactionCount:
            post._count.reactions,

          currentUserReaction:
            post.reactions[0]?.type ?? null,

          reactions,

          commentCount:
            post._count.comments,

          comments: post.comments,

          totalPosts,
        };
      });

    return {
      success: true,
      data: formattedPosts,
    };
  } catch (error) {
    console.error(
      "[GET_ALL_COMMUNITY_POSTS_ERROR]",
      {
        userId,
        timestamp:
          new Date().toISOString(),
        error:
          error instanceof Error
            ? error.message
            : error,
      },
    );

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(
      "Failed to load community posts",
      "GET_POSTS_FAILED",
      500,
    );
  }
}