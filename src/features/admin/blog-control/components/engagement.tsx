import { Heart, MessageCircle } from "lucide-react";
import { Blog } from "./blog-dashboard";

const numberFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});
export function formatCount(value: number) {
  return numberFormatter.format(Math.max(0, value));
}

export function Engagement({ blog }: { blog: Blog }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-1.5 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300">
        <Heart className="size-3.5" aria-hidden="true" />
        {formatCount(blog.reactions)}
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-2.5 py-1.5 text-sky-600 dark:bg-sky-950/40 dark:text-sky-300">
        <MessageCircle className="size-3.5" aria-hidden="true" />
        {formatCount(blog.comments)}
      </span>
    </div>
  );
}