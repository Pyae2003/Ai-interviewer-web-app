"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  CircleOff,
  FileQuestion,
  Plus,
  Search,
  Tags,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CategoriesTable from "./categories-table";
import { createCategoryPath } from "@/constants/route";

export type CategoryDashboardItem = {
  id: string;
  name: string;
  description: string | null;
  groupName: string;
  questionCount: number;
  interviewCount:number;
  isActive: boolean;
  updatedAt: string;
  createdAt?:string;
  sortOrder?:number;
};

type DashboardCategoriesProps = {
  categories?: CategoryDashboardItem[];
  createHref?: string;
  basePath?: string;
  onDelete?: (category: CategoryDashboardItem) => void;
};

type AnimatedHeadlineProps = {
  text: string;
};

function AnimatedHeadline({ text }: AnimatedHeadlineProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <h1
      aria-label={text}
      className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
    >
      <span
        aria-hidden="true"
        className="inline-flex flex-wrap overflow-hidden py-1"
      >
        {text.split("").map((character, index) => (
          <motion.span
            key={`${character}-${index}`}
            className="inline-block"
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
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    duration: 0.35,
                    delay: index * 0.03,
                    ease: [0.22, 1, 0.36, 1],
                  }
            }
          >
            {character === " " ? "\u00A0" : character}
          </motion.span>
        ))}
      </span>
    </h1>
  );
}


const DashboardCategories = ({
  categories = [],
}: DashboardCategoriesProps) => {
  const [search, setSearch] = React.useState("");

  const filteredCategories = React.useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return categories;
    }

    return categories.filter(
      (category) =>
        category.name.toLowerCase().includes(query) ||
        category.groupName.toLowerCase().includes(query) ||
        category.description?.toLowerCase().includes(query),
    );
  }, [categories, search]);


  const stats = React.useMemo(
    () => ({
      total: categories.length,
      active: categories.filter((category) => category.isActive).length,
      inactive: categories.filter((category) => !category.isActive).length,
      questions: categories.reduce(
        (total, category) => total + category.questionCount,
        0,
      ),
    }),
    [categories],
  );

  const statisticCards = [
    {
      title: "Total Categories",
      value: stats.total,
      icon: Tags,
      iconClassName:
        "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
    },
    {
      title: "Active",
      value: stats.active,
      icon: CheckCircle2,
      iconClassName:
        "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
    },
    {
      title: "Inactive",
      value: stats.inactive,
      icon: CircleOff,
      iconClassName:
        "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
    },
    {
      title: "Questions",
      value: stats.questions,
      icon: FileQuestion,
      iconClassName:
        "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
    },
  ];

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <AnimatedHeadline text="Categories" />

          <p className="text-muted-foreground">
            Manage interview categories and their questions
          </p>
        </div>

        <Button asChild>
          <Link href={createCategoryPath}>
            <Plus className="mr-2 h-4 w-4" />
            Create Category
          </Link>
        </Button>
      </div>

      {/* STATS */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statisticCards.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.title}>
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {stat.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {stat.value}
                  </h2>
                </div>

                <div className={`rounded-xl p-3 ${stat.iconClassName}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* SEARCH */}
      <Card>
        <CardContent className="p-5">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search categories..."
              aria-label="Search categories"
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* TABLE */}
      <Card>
        <CardContent className="p-0">
          {filteredCategories.length === 0 ? (
            <div className="flex min-h-56 flex-col items-center justify-center p-8 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                <Tags className="h-6 w-6" />
              </div>

              <h2 className="font-semibold text-foreground">
                {search
                  ? "No matching categories"
                  : "No categories created"}
              </h2>

              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                {search
                  ? "Try searching with a different name or category group."
                  : "Create your first category to start adding interview questions."}
              </p>
            </div>
          ) : (
            <CategoriesTable filteredCategories={filteredCategories} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCategories;