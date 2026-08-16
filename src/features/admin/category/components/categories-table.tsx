"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import {
  Eye,
  Layers3,
  MoreHorizontal,
  Pencil,
  Tags,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import DeleteButton from "@/components/delete-button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { formatDate } from "@/lib/format-date";

import { deleteCategory } from "../actions/delete-single-categorie";
import { CategoryDashboardItem } from "./dashboard-categories";

type CategoriesTableProps = {
  filteredCategories: CategoryDashboardItem[];
  basePath?: string;
};

const CategoriesTable = ({
  filteredCategories,
  basePath = "/admin/categories",
}: CategoriesTableProps) => {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const handleDelete = async (id: string) => {
    await deleteCategory(id);
    router.refresh();
  };

  if (filteredCategories.length === 0) {
    return (
      <div className="flex min-h-56 flex-col items-center justify-center p-8 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
          <Tags className="h-6 w-6" />
        </div>

        <h2 className="font-semibold text-foreground">
          No categories found
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Try searching with a different name or category group.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-225">
        <thead className="border-b bg-muted/40">
          <tr>
            <th
              scope="col"
              className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground"
            >
              Category
            </th>

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
              Questions
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
          {filteredCategories.map((category, index) => (
            <motion.tr
              key={category.id}
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
                delay: shouldReduceMotion
                  ? 0
                  : Math.min(index * 0.04, 0.3),
                ease: "easeOut",
              }}
              className="border-b transition-colors last:border-0 hover:bg-muted/30"
            >
              {/* CATEGORY */}
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                    <Tags className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-medium text-foreground">
                      {category.name}
                    </p>

                    <p className="max-w-xs truncate text-sm text-muted-foreground">
                      {category.description || "No description provided"}
                    </p>
                  </div>
                </div>
              </td>

              {/* GROUP */}
              <td className="px-5 py-4">
                <div className="flex items-center gap-2">
                  <Layers3 className="h-4 w-4 shrink-0 text-muted-foreground" />

                  <span className="max-w-48 truncate text-sm font-medium">
                    {category.groupName}
                  </span>
                </div>
              </td>

              {/* QUESTIONS */}
              <td className="px-5 py-4">
                <span className="font-medium text-foreground">
                  {category.questionCount}
                </span>
              </td>

              {/* STATUS */}
              <td className="px-5 py-4">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                    category.isActive
                      ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                      : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                  }`}
                >
                  {category.isActive ? "Active" : "Inactive"}
                </span>
              </td>

              {/* UPDATED DATE */}
              <td className="px-5 py-4">
                <time
                  dateTime={category.updatedAt}
                  className="text-sm text-muted-foreground"
                >
                  {formatDate(category.updatedAt)}
                </time>
              </td>

              {/* ACTIONS */}
              <td className="px-5 py-4 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label={`Open actions for ${category.name}`}
                      className="h-9 w-9"
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem asChild>
                      <Link
                        href={`${basePath}/view-detail/${category.id}`}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link
                        href={`${basePath}/edit-categories/${category.id}`}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onSelect={(event) => event.preventDefault()}
                      className="p-0 text-red-600 focus:text-red-600"
                    >
                      <DeleteButton
                        id={category.id}
                        onDelete={handleDelete}
                      />
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
};

export default CategoriesTable;