"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Eye, Layers3, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { CategoryGroupListItem } from "../query/get-all-category-groups";
import { formatDate } from "@/lib/format-date";
import Link from "next/link";
import { updateCategoryGroupPath, viewDetailCategoryGroupPath } from "@/constants/route";
import DeleteButton from "@/components/delete-button";
import { deleteCategoryGroup } from "../actions/delete-category-group";

type CategoryGroupTableProps = {
  groups: CategoryGroupListItem[];
};

export default function CategoryGroupTable({
  groups,
}: CategoryGroupTableProps) {
  const shouldReduceMotion = useReducedMotion();

  const handleDelete = async (id: string) => {
  await deleteCategoryGroup({id});
};

  if (groups.length === 0) {
    return (
      <div className="flex min-h-48 flex-col items-center justify-center p-8 text-center">
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
          <Layers3 className="h-5 w-5" />
        </div>

        <p className="font-medium text-foreground">No category groups found</p>

        <p className="mt-1 text-sm text-muted-foreground">
          Category groups will appear here after they are created.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-190">
        <thead className="border-b bg-muted/40">
          <tr>
            <th
              scope="col"
              className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground"
            >
              Group
            </th>

            <th
              scope="col"
              className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground"
            >
              Categories
            </th>

            <th
              scope="col"
              className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground"
            >
              Status
            </th>

            <th
              scope="col"
              className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground"
            >
              Updated
            </th>

            <th
              scope="col"
              className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wide text-muted-foreground"
            >
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {groups.map((group, index) => (
            <motion.tr
              key={group.id}
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 8,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.3,
                delay: shouldReduceMotion ? 0 : Math.min(index * 0.04, 0.3),
                ease: "easeOut",
              }}
              className="border-b transition-colors last:border-0 hover:bg-muted/30"
            >
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                    <Layers3 className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-medium text-foreground">
                      {group.name}
                    </p>

                    <p className="max-w-sm truncate text-sm text-muted-foreground">
                      {group.description || "No description provided"}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-5 py-4">
                <span className="font-medium text-foreground">
                  {group.categoryCount}
                </span>
              </td>

              <td className="px-5 py-4">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                    group.status === "ACTIVE"
                      ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                      : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                  }`}
                >
                  {group.status === "ACTIVE" ? "Active" : "Inactive"}
                </span>
              </td>

              {/* UPDATED DATE */}
              <td className="px-5 py-4">
                <time
                  dateTime={group.updatedAt}
                  className="text-sm text-muted-foreground"
                >
                  {formatDate(group.updatedAt)}
                </time>
              </td>

              <td className="px-5 py-4 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label={`Open actions for ${group.name}`}
                      className="h-9 w-9"
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-36">
                    <DropdownMenuItem asChild>
                     <Link href={viewDetailCategoryGroupPath(group.id)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                     </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link href={updateCategoryGroupPath(group.id)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                    asChild
                    >
                     <DeleteButton id={group.id} onDelete={handleDelete} />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
