import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  FileQuestion,
  FolderTree,
  Hash,
  Layers3,
  ListOrdered,
  Palette,
  Pencil,
  Tag,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { formatDate } from "@/lib/format-date";

import type { CategoryGroupDetail } from "../query/get-category-groups-with-id";
import { categoriesdashboardPath, updateCategoryGroupPath } from "@/constants/route";

type ViewDetailCategoryGroupProps = {
  group: CategoryGroupDetail;
  backHref?: string;
  editHref?: string;
};

function formatType(type: CategoryGroupDetail["type"]) {
  return String(type)
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export default function ViewDetailCategoryGroup({
  group,
  backHref = "/admin/category-groups",
}: ViewDetailCategoryGroupProps) {
  const resolvedEditHref =
    updateCategoryGroupPath(group.id);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4 md:p-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <Button
            variant="outline"
            size="icon"
            asChild
            className="mt-1 shrink-0"
          >
            <Link href={backHref} aria-label="Back to category groups">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                {group.name}
              </h1>

              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                  group.isActive
                    ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                    : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                }`}
              >
                {group.isActive ? "Active" : "Inactive"}
              </span>
            </div>

            <p className="mt-1 text-sm text-muted-foreground">
              View category group information and configuration
            </p>
          </div>
        </div>

        <Button variant="outline" asChild>
          <Link href={resolvedEditHref}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Group
          </Link>
        </Button>
      </div>

      {/* DESCRIPTION */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
              <Layers3 className="h-7 w-7" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-muted-foreground">
                Description
              </p>

              <p className="mt-2 leading-7 text-foreground">
                {group.description || "No description has been provided."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SUMMARY */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
              <FolderTree className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Categories
              </p>

              <p className="text-2xl font-bold">
                {group.categoryCount}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              <FileQuestion className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Questions
              </p>

              <p className="text-2xl font-bold">
                {group.questionCount}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
              <Tag className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">Type</p>

              <p className="truncate font-semibold">
                {formatType(group.type)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300">
              <CalendarDays className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Created</p>

              <p className="text-sm font-semibold">
                {formatDate(group.createdAt)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
              <Clock className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Updated</p>

              <p className="text-sm font-semibold">
                {formatDate(group.updatedAt)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* GROUP INFORMATION */}
      <Card>
        <CardContent className="p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-foreground">
              Group Information
            </h2>

            <p className="text-sm text-muted-foreground">
              Technical information for this category group
            </p>
          </div>

          <dl className="divide-y rounded-xl border">
            <div className="grid gap-1 p-4 sm:grid-cols-[180px_1fr] sm:items-center">
              <dt className="flex items-center gap-2 text-sm text-muted-foreground">
                <Hash className="h-4 w-4" />
                Group ID
              </dt>

              <dd className="break-all font-mono text-sm text-foreground">
                {group.id}
              </dd>
            </div>

            <div className="grid gap-1 p-4 sm:grid-cols-[180px_1fr] sm:items-center">
              <dt className="flex items-center gap-2 text-sm text-muted-foreground">
                <Tag className="h-4 w-4" />
                Slug
              </dt>

              <dd className="break-all font-mono text-sm text-foreground">
                {group.slug}
              </dd>
            </div>

            <div className="grid gap-1 p-4 sm:grid-cols-[180px_1fr] sm:items-center">
              <dt className="flex items-center gap-2 text-sm text-muted-foreground">
                <Layers3 className="h-4 w-4" />
                Group type
              </dt>

              <dd className="text-sm font-medium text-foreground">
                {formatType(group.type)}
              </dd>
            </div>

            <div className="grid gap-1 p-4 sm:grid-cols-[180px_1fr] sm:items-center">
              <dt className="flex items-center gap-2 text-sm text-muted-foreground">
                <ListOrdered className="h-4 w-4" />
                Display order
              </dt>

              <dd className="text-sm font-medium text-foreground">
                {group.order}
              </dd>
            </div>

            <div className="grid gap-1 p-4 sm:grid-cols-[180px_1fr] sm:items-center">
              <dt className="flex items-center gap-2 text-sm text-muted-foreground">
                <Palette className="h-4 w-4" />
                Color
              </dt>

              <dd className="flex items-center gap-2 text-sm text-foreground">
                {group.color ? (
                  <>
                    <span
                      className="h-4 w-4 rounded-full border"
                      style={{ backgroundColor: group.color }}
                    />

                    <span className="font-mono">{group.color}</span>
                  </>
                ) : (
                  <span className="text-muted-foreground">
                    Not configured
                  </span>
                )}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}