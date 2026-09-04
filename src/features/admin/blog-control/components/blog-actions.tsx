import { Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function BlogActions({ detailsHref, onDelete }: { detailsHref: string; onDelete: () => void }) {
  return (
    <div className="flex justify-end gap-2">
      <Button asChild variant="outline" size="icon" className="size-9 rounded-lg" title="View blog">
        <Link href={detailsHref} aria-label="View blog">
          <Eye className="size-4" aria-hidden="true" />
        </Link>
      </Button>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={onDelete}
        className="size-9 rounded-lg border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900 dark:hover:bg-red-950/40"
        aria-label="Delete blog"
        title="Delete blog"
      >
        <Trash2 className="size-4" aria-hidden="true" />
      </Button>
    </div>
  );
}
