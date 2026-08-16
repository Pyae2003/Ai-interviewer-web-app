"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CircleHelp, Eye, MoreHorizontal, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { formatDate } from "@/lib/format-date";
import DeleteButton from "@/components/delete-button";
import { QuestionDashboardItem } from "./question-dashboard";
import { deleteQuestion } from "../actions/delete-question";
import { editQuestionPath, viewDetailQuestionPath } from "@/constants/route";
import { getDifficultyClasses } from "@/lib/get-difficulty-classes";
import { formatLabel } from "@/lib/format-label";


type QuestionsTableProp = {
  filteredQuestions: QuestionDashboardItem[];
};
const QuestionsTable = ({ filteredQuestions }: QuestionsTableProp) => {
  const handleDelete = async (id: string) => {
    await deleteQuestion(id);
  };
  const shouldReduceMotion = useReducedMotion();

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-250">
          <thead className="border-b bg-muted/40">
            <tr>
              <th
                scope="col"
                className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground"
              >
                Question
              </th>

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
                Difficulty
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
            {filteredQuestions.map((question, index) => (
              <motion.tr
                key={question.id}
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
                <td className="max-w-md px-5 py-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                      <CircleHelp className="h-4 w-4" />
                    </div>

                    <p className="line-clamp-2 text-sm font-medium leading-6 text-foreground">
                      {question.question}
                    </p>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <span className="text-sm font-medium">
                    {question.categoryName}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${getDifficultyClasses(
                      question.difficulty,
                    )}`}
                  >
                    {formatLabel(question.difficulty)}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <time
                    dateTime={question.updatedAt}
                    className="text-sm text-muted-foreground"
                  >
                    {formatDate(question.updatedAt)}
                  </time>
                </td>

                <td className="px-5 py-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label={`Actions for question`}
                        className="h-9 w-9"
                      >
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-36">
                      <DropdownMenuItem asChild>
                        <Link href={viewDetailQuestionPath(question.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link href={editQuestionPath(question.id)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                        <DeleteButton
                          id={question.id}
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
    </div>
  );
};

export default QuestionsTable;
