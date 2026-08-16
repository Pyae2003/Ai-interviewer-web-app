"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Search,
  Layers3,
  Tags,
  Plus,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CategoryGroupListItem } from "../query/get-all-category-groups";
import CategoryGroupTable from "./category-groups-table";
import Link from "next/link";
import { createCategoryGroupPath } from "@/constants/route";

type AnimatedHeadlineProps = {
  text: string;
};

export type CategoryGroupsProps = { groups: CategoryGroupListItem[] };

function AnimatedHeadline({ text }: AnimatedHeadlineProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <h1
      aria-label={text}
      className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
    >
      <span aria-hidden="true" className="inline-flex overflow-hidden py-1">
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

const CategoryGroupDashboard = ({ groups }: CategoryGroupsProps) => {
  const [search, setSearch] = React.useState("");

  const filteredGroups = React.useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return groups;
    }

    return groups.filter((group) => group.name.toLowerCase().includes(query));
  }, [search, groups]);

  const stats = React.useMemo(
    () => ({
      totalGroups: groups.length,
      totalCategories: groups.reduce(
        (total, group) => total + group.categoryCount,
        0,
      ),
    }),
    [groups],
  );

  const statisticCards = [
    {
      title: "Category Groups",
      value: stats.totalGroups,
      icon: Layers3,
      iconClassName:
        "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
    },
    {
      title: "Categories",
      value: stats.totalCategories,
      icon: Tags,
      iconClassName:
        "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
    },
  ];

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <AnimatedHeadline text="Category Groups" />

          <p className="text-muted-foreground">
            Organize and manage interview categories
          </p>
        </div>

        <Link href={createCategoryGroupPath}>
            <Button type="button" className="sm:self-center">
          <Plus className="mr-2 h-4 w-4" />
          Create Group
        </Button>
        </Link>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statisticCards.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.title}>
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>

                  <h2 className="mt-2 text-3xl font-bold">{stat.value}</h2>
                </div>

                <div className={`rounded-xl p-3 ${stat.iconClassName}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardContent className="p-5">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search category groups..."
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-0">
            <CategoryGroupTable groups={filteredGroups} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryGroupDashboard;
