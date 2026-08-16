import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CircleHelp,
  Clock,
  Gauge,
  Group,
  Hash,
  Layers3,
  Pencil,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { formatDate } from "@/lib/format-date";
import { QuestionDashboardItem } from "./questions-dashboard";
import { getDifficultyClasses } from "@/lib/get-difficulty-classes";
import { formatLabel } from "@/lib/format-label";


type ViewDetailQuestionProps = {
  question: QuestionDashboardItem;
  backHref?: string;
  editHref?: string;
};

export default function ViewDetailQuestion({
  question,
  backHref = "/admin/questions",
  editHref,
}: ViewDetailQuestionProps) {
  const resolvedEditHref =
    editHref ?? `/admin/questions/edit/${question.id}`;

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 p-4 md:p-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <Button
            variant="outline"
            size="icon"
            asChild
            className="mt-1 shrink-0"
          >
            <Link href={backHref} aria-label="Back to questions">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Question Details
              </h1>
            </div>

            <p className="mt-1 text-sm text-muted-foreground">
              View question information and configuration
            </p>
          </div>
        </div>

        <Button variant="outline" asChild>
          <Link href={resolvedEditHref}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Question
          </Link>
        </Button>
      </div>

      {/* QUESTION */}
      <Card>
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
              <CircleHelp className="h-7 w-7" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-muted-foreground">
                Interview question
              </p>

              <p className="mt-3 text-lg font-medium leading-8 text-foreground md:text-xl">
                {question.question}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SUMMARY */}
      <section
        aria-label="Question summary"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
      >
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
              <Layers3 className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">
                Category
              </p>

              <p className="truncate font-semibold">
                {question.categoryName}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              <Group className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">
                Category Groups
              </p>

              <p className="truncate font-semibold">
                {question.categoryGroupName?.slice(0, 12)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${getDifficultyClasses(
                question.difficulty,
              )}`}
            >
              <Gauge className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Difficulty
              </p>

              <p className="font-semibold">
                {formatLabel(question.difficulty)}
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
              <p className="text-sm text-muted-foreground">
                Created
              </p>

              <p className="text-sm font-semibold">
                {formatDate(question.createdAt!)}
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
              <p className="text-sm text-muted-foreground">
                Updated
              </p>

              <p className="text-sm font-semibold">
                {formatDate(question.updatedAt)}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* TECHNICAL INFORMATION */}
      <Card>
        <CardContent className="p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-foreground">
              Question Information
            </h2>

            <p className="text-sm text-muted-foreground">
              Technical information for this question
            </p>
          </div>

          <dl className="divide-y rounded-xl border">
            <div className="grid gap-1 p-4 sm:grid-cols-[180px_1fr] sm:items-center">
              <dt className="flex items-center gap-2 text-sm text-muted-foreground">
                <Hash className="h-4 w-4" />
                Question ID
              </dt>

              <dd className="break-all font-mono text-sm text-foreground">
                {question.id}
              </dd>
            </div>

            <div className="grid gap-1 p-4 sm:grid-cols-[180px_1fr] sm:items-center">
              <dt className="flex items-center gap-2 text-sm text-muted-foreground">
                <Hash className="h-4 w-4" />
                Category ID
              </dt>

              <dd className="break-all font-mono text-sm text-foreground">
                {question.categoryId}
              </dd>
            </div>


            <div className="grid gap-1 p-4 sm:grid-cols-[180px_1fr] sm:items-center">
              <dt className="flex items-center gap-2 text-sm text-muted-foreground">
                <Gauge className="h-4 w-4" />
                Difficulty
              </dt>

              <dd>
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getDifficultyClasses(
                    question.difficulty,
                  )}`}
                >
                  {formatLabel(question.difficulty)}
                </span>
              </dd>
            </div>

          </dl>
        </CardContent>
      </Card>
    </main>
  );
}