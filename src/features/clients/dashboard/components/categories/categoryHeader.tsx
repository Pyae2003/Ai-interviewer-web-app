"use client";

import {
  Briefcase,
} from "lucide-react";
import { AnimatedCategoryTitle } from "./animated-categories-title";
import { CategoryStatusBadge } from "./category-status-badge";



type CategoryHeaderProps = {
  name: string;
  description?: string | null;
  isActive: boolean;
};

export function CategoryHeaderForCard({
  name,
  description,
  isActive,
}: CategoryHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex min-w-0 items-start gap-3.5">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-sky-200 bg-sky-50 text-sky-600 shadow-sm transition-transform duration-300 group-hover:-rotate-2 group-hover:scale-105 dark:border-sky-900/70 dark:bg-sky-950/50 dark:text-sky-400">
          <Briefcase className="size-5" aria-hidden="true" />
        </div>

        <div className="min-w-0 pt-0.5">
          <AnimatedCategoryTitle title={name} />

          <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-muted-foreground">
            {description?.trim() || "No description available"}
          </p>
        </div>
      </div>

      <CategoryStatusBadge isActive={isActive} />
    </div>
  );
}
