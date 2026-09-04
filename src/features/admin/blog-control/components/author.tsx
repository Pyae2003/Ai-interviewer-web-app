import { AvatarFallback, AvatarImage , Avatar} from "@/components/ui/avatar";
import { Blog } from "./blog-dashboard";

export function getInitials(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U"
  );
}

export function Author({ blog, compact = false }: { blog: Blog; compact?: boolean }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <Avatar className={compact ? "size-7" : "size-9"}>
        <AvatarImage src={blog.author.image ?? undefined} alt={blog.author.name} />
        <AvatarFallback className="bg-sky-100 text-xs font-semibold text-sky-700 dark:bg-sky-950 dark:text-sky-300">
          {getInitials(blog.author.name)}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-slate-900 dark:text-white">{blog.author.name}</p>
        {!compact ? (
          <p className="max-w-52 truncate text-xs text-slate-500 dark:text-slate-400">{blog.author.email}</p>
        ) : null}
      </div>
    </div>
  );
}