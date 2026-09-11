"use client";

import { useMemo, useState } from "react";
import {
  FileText,
  Heart,
  ImageIcon,
  Loader2,
  MessageCircle,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { detailsBlogPath } from "@/constants/route";
import { PostDate } from "./post-date";
import { BlogActions } from "./blog-actions";
import { EmptyState } from "./empty-state";
import { Engagement, formatCount } from "./engagement";
import { StatCard } from "./stat-card";
import { Author } from "./author";
import { TableHeading } from "./table-heading";
import { deletePost } from "../actions/delete-blog";

export type Blog = {
  id: string;
  caption: string;
  images: string[];
  author: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };
  createdAt: Date | string;
  updatedAt: Date | string;
  reactions: number;
  comments: number;
};

type AdminBlogsPageProps = {
  blogs: Blog[];
  detailsBasePath?: string;
};

export default function AdminBlogsPage({ blogs }: AdminBlogsPageProps) {
  const [search, setSearch] = useState("");
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const normalizedSearch = search.trim().toLowerCase();

  const filteredBlogs = useMemo(() => {
    if (!normalizedSearch) return blogs;

    return blogs.filter((blog) =>
      [blog.caption, blog.author.name, blog.author.email].some((value) =>
        value.toLowerCase().includes(normalizedSearch),
      ),
    );
  }, [blogs, normalizedSearch]);

  const stats = useMemo(
    () =>
      blogs.reduce(
        (total, blog) => ({
          reactions: total.reactions + blog.reactions,
          comments: total.comments + blog.comments,
          withImages: total.withImages + Number(blog.images.length > 0),
        }),
        { reactions: 0, comments: 0, withImages: 0 },
      ),
    [blogs],
  );

  async function handleDelete() {
    if (!blogToDelete || isDeleting) return;

    setIsDeleting(true);

    try {
      await deletePost({ postId: blogToDelete.id });
      toast.success("Blog deleted successfully.");
      setBlogToDelete(null);
    } catch (error) {
      console.error("[ADMIN_DELETE_BLOG_ERROR]", error);
      toast.error("The blog could not be deleted. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <main className="min-h-svh bg-slate-50/80 px-3 py-5 dark:bg-slate-950 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto w-full max-w-7xl space-y-6">
        <header className="overflow-hidden rounded-2xl border border-sky-100 bg-linear-to-br from-sky-100 via-sky-50 to-white shadow-sm dark:border-sky-900/60 dark:from-sky-950 dark:via-slate-950 dark:to-slate-950">
          <div className="flex flex-col gap-5 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-7">
            <div className="min-w-0">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-sky-700 dark:text-sky-300">
                <span className="flex size-8 items-center justify-center rounded-lg bg-white/80 shadow-sm dark:bg-sky-900/60">
                  <FileText className="size-4" aria-hidden="true" />
                </span>
                Content management
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
                Blog Management
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                Review, search, and moderate community posts from one place.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3 rounded-xl border border-white/80 bg-white/75 px-4 py-3 shadow-sm backdrop-blur dark:border-sky-900/70 dark:bg-slate-950/60">
              <span className="flex size-10 items-center justify-center rounded-full bg-sky-100 text-sky-700 dark:bg-sky-900/60 dark:text-sky-300">
                <FileText className="size-5" aria-hidden="true" />
              </span>
              
            </div>
          </div>
        </header>

        <section
          aria-label="Blog statistics"
          className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
        >
          <StatCard
            title="Total blogs"
            value={blogs.length}
            description="All community posts"
            icon={FileText}
          />
          <StatCard
            title="With images"
            value={stats.withImages}
            description="Posts with media"
            icon={ImageIcon}
          />
          <StatCard
            title="Reactions"
            value={stats.reactions}
            description="Total user reactions"
            icon={Heart}
          />
          <StatCard
            title="Comments"
            value={stats.comments}
            description="Community discussions"
            icon={MessageCircle}
          />
        </section>

        <section
          aria-labelledby="blogs-table-heading"
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex flex-col gap-4 border-b border-slate-200 px-4 py-4 dark:border-slate-800 sm:px-6 sm:py-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2
                id="blogs-table-heading"
                className="font-semibold text-slate-950 dark:text-white"
              >
                Community blogs
              </h2>
              <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                {filteredBlogs.length} of {blogs.length} blogs shown
              </p>
            </div>

            <div className="relative w-full lg:max-w-md">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <label htmlFor="blog-search" className="sr-only">
                Search blogs
              </label>
              <input
                id="blog-search"
                type="search"
                placeholder="Search caption, author, or email..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-sky-600 dark:focus:ring-sky-950"
              />
              {search ? (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-200 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                  aria-label="Clear search"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              ) : null}
            </div>
          </div>

          {filteredBlogs.length === 0 ? (
            <EmptyState hasSearch={Boolean(normalizedSearch)} />
          ) : (
            <>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 md:hidden">
                {filteredBlogs.map((blog) => (
                  <article key={blog.id} className="space-y-4 p-4">
                    <div className="flex gap-3">
                      <BlogThumbnail blog={blog} compact />
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm font-semibold leading-5 text-slate-900 dark:text-white">
                          {blog.caption || "Untitled post"}
                        </p>
                        <div className="mt-2">
                          <Author blog={blog} compact />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <Engagement blog={blog} />
                        <PostDate createdAt={blog.createdAt} compact />
                      </div>
                      <BlogActions
                        detailsHref={detailsBlogPath(blog.id)}
                        onDelete={() => setBlogToDelete(blog)}
                      />
                    </div>
                  </article>
                ))}
              </div>

              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-225">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-950/60">
                      <TableHeading>Blog</TableHeading>
                      <TableHeading>Author</TableHeading>
                      <TableHeading>Engagement</TableHeading>
                      <TableHeading>Date</TableHeading>
                      <TableHeading alignRight>Actions</TableHeading>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredBlogs.map((blog) => (
                      <tr
                        key={blog.id}
                        className="transition-colors hover:bg-sky-50/40 dark:hover:bg-sky-950/20"
                      >
                        <td className="px-5 py-4 xl:px-6">
                          <div className="flex max-w-lg items-center gap-4">
                            <BlogThumbnail blog={blog} />
                            <p className="line-clamp-2 min-w-0 text-sm font-semibold leading-5 text-slate-900 dark:text-white">
                              {blog.caption || "Untitled post"}
                            </p>
                          </div>
                        </td>
                        <td className="px-5 py-4 xl:px-6">
                          <Author blog={blog} />
                        </td>
                        <td className="px-5 py-4 xl:px-6">
                          <Engagement blog={blog} />
                        </td>
                        <td className="px-5 py-4 xl:px-6">
                          <PostDate createdAt={blog.createdAt} />
                        </td>
                        <td className="px-5 py-4 xl:px-6">
                          <BlogActions
                            detailsHref={detailsBlogPath(blog.id)}
                            onDelete={() => setBlogToDelete(blog)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          <footer className="border-t border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-400 sm:px-6">
            Showing{" "}
            <strong className="font-semibold text-slate-900 dark:text-white">
              {filteredBlogs.length}
            </strong>{" "}
            of{" "}
            <strong className="font-semibold text-slate-900 dark:text-white">
              {blogs.length}
            </strong>{" "}
            blogs
          </footer>
        </section>
      </div>

      <AlertDialog
        open={Boolean(blogToDelete)}
        onOpenChange={(open) => {
          if (!open && !isDeleting) setBlogToDelete(null);
        }}
      >
        <AlertDialogContent className="w-[calc(100%-2rem)] max-w-md rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this blog?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently deletes the selected blog. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isDeleting}
              onClick={(event) => {
                event.preventDefault();
                void handleDelete();
              }}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {isDeleting ? (
                <Loader2
                  className="mr-2 size-4 animate-spin"
                  aria-hidden="true"
                />
              ) : (
                <Trash2 className="mr-2 size-4" aria-hidden="true" />
              )}
              {isDeleting ? "Deleting..." : "Delete blog"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}

function BlogThumbnail({
  blog,
  compact = false,
}: {
  blog: Blog;
  compact?: boolean;
}) {
  const image = blog.images[0];
  const sizeClass = compact ? "size-16" : "h-16 w-24";

  return image ? (
    <img
      src={image}
      alt=""
      loading="lazy"
      className={`${sizeClass} shrink-0 rounded-xl border border-slate-200 object-cover dark:border-slate-700`}
    />
  ) : (
    <div
      className={`${sizeClass} flex shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-400 dark:border-slate-700 dark:bg-slate-800`}
      aria-label="No blog image"
    >
      <ImageIcon className="size-5" aria-hidden="true" />
    </div>
  );
}
