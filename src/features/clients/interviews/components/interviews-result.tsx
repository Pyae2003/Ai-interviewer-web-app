"use client";

import Link from "next/link";
import {
  Trophy,
  Target,
  BookOpen,
  CheckCircle2,
  RotateCcw,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { InterviewResultData } from "../type/type";
import HistoryQuestionList from "../../history/components/history-questions-list";

type Props = {
  result: InterviewResultData;
};

export default function InterviewResult({ result }: Props) {
  const grade =
    result.score >= 90
      ? "A+"
      : result.score >= 80
        ? "A"
        : result.score >= 70
          ? "B"
          : "C";

  const passed = result.score >= 70;

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 via-white to-yellow-50 px-4 py-10">
      {" "}
      <div className="mx-auto max-w-7xl space-y-6">
        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="overflow-hidden border-0 shadow-2xl bg-white/80 backdrop-blur">
            <div className={`h-2 ${passed ? "bg-green-500" : "bg-red-500"}`} />

            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col items-center text-center">
                <div
                  className={`mb-6 flex h-28 w-28 items-center justify-center rounded-full ${
                    passed ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  <Trophy
                    className={`h-14 w-14 ${
                      passed ? "text-green-600" : "text-red-600"
                    }`}
                  />
                </div>

                <h1 className="text-4xl font-bold">Interview Completed</h1>

                <p className="mt-2 text-muted-foreground">
                  {result.categoryName}
                </p>

                <div className="mt-8">
                  <div className="text-7xl md:text-8xl font-black bg-linear-to-r from-sky-500 to-yellow-400 bg-clip-text text-transparent">
                    {result.score}%
                  </div>

                  <div className="mt-2 text-2xl font-bold">Grade {grade}</div>

                  <div
                    className={`mt-4 inline-flex rounded-full px-4 py-2 text-sm font-medium ${
                      passed
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {passed ? "PASSED" : "NEEDS IMPROVEMENT"}
                  </div>
                </div>

                <div className="mt-6 w-full max-w-xl">
                  <Progress value={result.score} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* OVERVIEW */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6 text-center">
              <Target className="mx-auto mb-3 h-8 w-8 text-sky-600" />
              <h3 className="text-3xl font-bold">{result.score}%</h3>
              <p className="text-sm text-muted-foreground">Score</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="mx-auto mb-3 h-8 w-8 text-yellow-600" />
              <h3 className="text-3xl font-bold">{result.totalQuestions}</h3>
              <p className="text-sm text-muted-foreground">Questions</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle2 className="mx-auto mb-3 h-8 w-8 text-green-600" />
              <h3 className="text-3xl font-bold">{result.answeredQuestions}</h3>
              <p className="text-sm text-muted-foreground">Answered</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Sparkles className="mx-auto mb-3 h-8 w-8 text-purple-600" />
              <h3 className="text-3xl font-bold">{result.completionRate}%</h3>
              <p className="text-sm text-muted-foreground">Completion</p>
            </CardContent>
          </Card>
        </div>

        {/* DIFFICULTY */}
        <Card>
          <CardContent className="p-6">
            <h2 className="mb-6 text-xl font-bold">Difficulty Breakdown</h2>

            <div className="space-y-5">
              <div>
                <div className="mb-2 flex justify-between">
                  <span>Easy</span>
                  <span>{result.easyScore}%</span>
                </div>

                <Progress value={result.easyScore} />
              </div>

              <div>
                <div className="mb-2 flex justify-between">
                  <span>Medium</span>
                  <span>{result.mediumScore}%</span>
                </div>

                <Progress value={result.mediumScore} />
              </div>

              <div>
                <div className="mb-2 flex justify-between">
                  <span>Hard</span>
                  <span>{result.hardScore}%</span>
                </div>

                <Progress value={result.hardScore} />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-5">
          {result.answers.map((item, index) => (
            <HistoryQuestionList key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* ACTIONS */}
        <div className="grid gap-4 md:grid-cols-3">
          <Button asChild size="lg">
            <Link href="/dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link href="/history">View History</Link>
          </Button>

          <Button asChild variant="secondary" size="lg">
            <Link href="/interview/start">
              <RotateCcw className="mr-2 h-4 w-4" />
              Retake Interview
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
