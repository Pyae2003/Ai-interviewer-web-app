"use server";

import { prisma } from "@/config";
import { getSession } from "@/lib/get-Session";
import { Blog } from "../components/blog-dashboard";

export type AllBlogsResult =
  | {
      success: true;
      data: Blog[];
    }
  | {
      success: false;
      error: string;
    };

export const allBlogs = async (): Promise<AllBlogsResult> => {
  try {
    const session = await getSession();

    if (!session?.user) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    if (session.user.role !== "admin") {
      return {
        success: false,
        error: "Forbidden",
      };
    }

    const [rawBlogs, total] = await prisma.$transaction([
      prisma.communityPost.findMany({
        orderBy: {
          createdAt: "desc",
        },

        select: {
          id: true,
          caption: true,
          images: true,
          createdAt: true,
          updatedAt: true,

          author: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },

          _count: {
            select: {
              reactions: true,
              comments: true,
            },
          },
        },
      }),
      prisma.communityPost.count(),
    ]);

    const blogs: Blog[] = rawBlogs.map((blog) => ({
      id: blog.id,
      caption: blog.caption,
      images: blog.images,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,

      author: blog.author,

      reactions: blog._count.reactions,
      comments: blog._count.comments,
    }));

    return {
      success: true,
      data: blogs,
    };
  } catch (error) {
    console.error("[ALL_BLOGS_ERROR]", error);

    return {
      success: false,
      error: "Failed to fetch blogs",
    };
  }
};
