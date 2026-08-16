"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  CircleHelp,
  Plus,
  Search,
  Tags,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import QuestionsTable from "./questions-table";
import { createQuestionPath } from "@/constants/route";
import { Difficulty } from "@/generated/prisma/enums";

export type QuestionDashboardItem = {
  id: string;
  question: string;
  difficulty: Difficulty;
  categoryId: string;
  categoryName: string;
  updatedAt: string;
  createdAt?:string;
  categoryGroupName?: string;
};

type QuestionDashboardProps = {
  questions?: QuestionDashboardItem[];
  basePath?: string;
  createHref?: string;
  onDelete?: (question: QuestionDashboardItem) => void;
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


const QuestionDashboard = ({
  questions = [],
}: QuestionDashboardProps) => {
  
  const [search, setSearch] = React.useState("");

  const filteredQuestions = React.useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return questions;
    }

    return questions.filter(
      (question) =>
        question.question.toLowerCase().includes(query) ||
        question.categoryName.toLowerCase().includes(query) ||
        question.difficulty.toLowerCase().includes(query),
    );
  }, [questions, search]);

  const stats = React.useMemo(
    () => ({
      total: questions.length,
      categories: new Set(questions.map((question) => question.categoryId))
        .size,
    }),
    [questions],
  );

  const statisticCards = [
    {
      title: "Total Questions",
      value: stats.total,
      icon: CircleHelp,
      iconClassName:
        "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
    },
    {
      title: "Categories",
      value: stats.categories,
      icon: Tags,
      iconClassName:
        "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
    },
  ];

  return (
    <main className="space-y-6 p-4 md:p-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <AnimatedHeadline text="Questions" />

          <p className="text-muted-foreground">
            Manage interview questions and difficulty levels
          </p>
        </div>

        <Button asChild>
          <Link href={createQuestionPath}>
            <Plus className="mr-2 h-4 w-4" />
            Create Question
          </Link>
        </Button>
      </div>

      {/* STATS */}
      <section
        aria-label="Question statistics"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {statisticCards.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.title}>
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>

                  <p className="mt-2 text-3xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>

                <div className={`rounded-xl p-3 ${stat.iconClassName}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {/* SEARCH */}
      <Card>
        <CardContent className="p-5">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search questions..."
              aria-label="Search questions"
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* QUESTION TABLE */}
      <Card>
        <CardContent className="p-0">
          {filteredQuestions.length === 0 ? (
            <div className="flex min-h-56 flex-col items-center justify-center p-8 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                <CircleHelp className="h-6 w-6" />
              </div>

              <h2 className="font-semibold text-foreground">
                {search ? "No matching questions" : "No questions created"}
              </h2>

              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                {search
                  ? "Try searching with different keywords."
                  : "Create your first question to start building interviews."}
              </p>
            </div>
          ) : (
            <QuestionsTable filteredQuestions={filteredQuestions} />
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default QuestionDashboard;
