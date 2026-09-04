import Link from "next/link";
import {
  Globe2,
  MoreHorizontal,
  Pencil,
  Sparkles,
  Trash2,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { editBlogPath } from "@/constants/route";

import type { CommunityPost } from "./home-post.types";
import {
  formatPostDate,
  formatPostDateTitle,
  getInitials,
} from "./home-post.utils";

type PostHeaderProps = {
  post: Pick<CommunityPost, "id" | "author" | "createdAt">;
  isOwner: boolean;
  onDeleteRequested: () => void;
};

export function PostHeader({
  post,
  isOwner,
  onDeleteRequested,
}: PostHeaderProps) {
  return (
    <header className="flex items-start justify-between gap-3 border-b border-sky-100/80 bg-linear-to-r from-sky-50/95 via-white to-blue-50/70 px-4 py-4 dark:border-sky-900/50 dark:from-sky-950/45 dark:via-slate-950 dark:to-blue-950/30 sm:px-5">
      <div className="flex min-w-0 items-center gap-3">
        <Avatar className="size-11 shrink-0 border-2 border-white shadow-sm ring-1 ring-sky-100 dark:border-slate-900 dark:ring-sky-900 sm:size-12">
          <AvatarImage
            src={post.author.image ?? undefined}
            alt={`${post.author.name}'s profile picture`}
          />
          <AvatarFallback className="bg-sky-100 font-semibold text-sky-700 dark:bg-sky-950 dark:text-sky-300">
            {getInitials(post.author.name)}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <div className="flex min-w-0 items-center gap-2">
            <p className="truncate text-sm font-semibold text-slate-950 dark:text-slate-100">
              {post.author.name}
            </p>

            <Badge
              variant="outline"
              className="hidden shrink-0 items-center gap-1 rounded-full border-sky-200 bg-white/80 px-2 py-0.5 text-[10px] font-medium text-sky-700 shadow-xs dark:border-sky-800 dark:bg-sky-950/70 dark:text-sky-300 sm:inline-flex"
            >
              <Sparkles className="size-3" aria-hidden="true" />
              Interviewer
            </Badge>
          </div>

          <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <time
              dateTime={post.createdAt}
              title={formatPostDateTitle(post.createdAt)}
              suppressHydrationWarning
            >
              {formatPostDate(post.createdAt)}
            </time>

            <span aria-hidden="true">•</span>

            <span className="inline-flex items-center gap-1">
              <Globe2 className="size-3" aria-hidden="true" />
              Public
            </span>
          </div>
        </div>
      </div>

      {isOwner ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-9 shrink-0 rounded-full text-slate-500 transition-colors hover:bg-white hover:text-sky-700 dark:text-slate-400 dark:hover:bg-sky-950/70 dark:hover:text-sky-300"
              aria-label="Manage post"
            >
              <MoreHorizontal className="size-5" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-44 rounded-xl border-sky-100 dark:border-sky-900"
          >
            <DropdownMenuItem asChild className="cursor-pointer rounded-lg">
              <Link href={editBlogPath(post.id)}>
                <Pencil className="mr-2 size-4" aria-hidden="true" />
                Edit post
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="cursor-pointer rounded-lg text-destructive focus:bg-destructive/10 focus:text-destructive"
              onSelect={onDeleteRequested}
            >
              <Trash2 className="mr-2 size-4" aria-hidden="true" />
              Delete post
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
    </header>
  );
}
