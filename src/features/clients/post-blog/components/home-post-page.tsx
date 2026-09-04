import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { requireVerifiedUserPage } from "@/lib/auth-access";

import { getAllPosts } from "../query/get-all-posts";
import HomePost from "./home-post";
import { createBlogPath } from "@/constants/route";


export default async function HomePostPage() {
  const session = await requireVerifiedUserPage();

  const result = await getAllPosts();
  const posts = result.data ?? [];

  return (
    <main className="min-h-svh bg-linear-to-b from-sky-50/70 via-background to-muted/30 py-6 dark:from-sky-950/20 sm:py-10">
      <section
        aria-labelledby="community-posts-heading"
        className="mx-auto w-full max-w-3xl"
      >
        {/* Page header */}
        <header className="mb-6 flex flex-col gap-4 px-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between sm:px-6">
          <div className="min-w-0">
            <h1
              id="community-posts-heading"
              className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            >
              Community Posts
            </h1>

            <p className="mt-1.5 max-w-xl text-sm leading-6 text-muted-foreground">
              Discover interview achievements and celebrate progress with the
              community.
            </p>
          </div>

          <Button
            asChild
            className="h-10 w-full shrink-0 rounded-full bg-sky-600 px-5 font-semibold text-white shadow-sm hover:bg-sky-700 hover:shadow-md sm:w-auto"
          >
            <Link href={createBlogPath}>
              <Plus className="mr-2 size-4" aria-hidden="true" />
              Create post
            </Link>
          </Button>
        </header>

        {posts.length === 0 ? (
          <div className="px-5 py-14 text-center sm:px-10">
            <div
              aria-hidden="true"
              className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-sky-100 text-3xl shadow-sm dark:bg-sky-950"
            >
              💬
            </div>

            <h2 className="text-lg font-semibold text-foreground">
              No posts yet
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              Be the first to share your interview achievement with the
              community.
            </p>

            <Button
              asChild
              className="mt-6 rounded-full bg-sky-600 px-5 text-white hover:bg-sky-700"
            >
              <Link href={createBlogPath}>
                <Plus className="mr-2 size-4" aria-hidden="true" />
                Create the first post
              </Link>
            </Button>
          </div>
        ) : (
          <div className="py-4 sm:py-8">
            <div className="flex flex-col gap-4 sm:gap-5">
              {posts.map((post) => (
                <HomePost
                  key={post.id}
                  post={post}
                  isOwner={post.author.id === session.user.id}
                  currentUser={{
                    id : session.user.id,
                    name: session.user.name,
                    image: session.user.image,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
