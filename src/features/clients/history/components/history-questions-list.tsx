"use client"

import {
  MessageSquare,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Brain,
  Trophy,
  HelpCircle,
} from "lucide-react";

import { motion } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { QuestionResult } from "./history-detail";

type Props = {
  index: number;
  item: QuestionResult;
};

export default function HistoryQuestionList({ item, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
    >
      <Card className="overflow-hidden border-0 shadow-lg">

        <div className="h-2 bg-linear-to-r from-sky-500 via-cyan-400 to-yellow-400" />

        <CardHeader className="space-y-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle className="text-2xl">Question {index + 1}</CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                AI Evaluation Report
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge
                className={
                  item.difficulty === "EASY"
                    ? "bg-green-100 text-green-700"
                    : item.difficulty === "MEDIUM"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                }
              >
                {item.difficulty}
              </Badge>

              <Badge variant={item.isCorrect ? "default" : "destructive"}>
                {item.isCorrect ? "Correct" : "Incorrect"}
              </Badge>

              <Badge variant="outline">{item.score}/100</Badge>
            </div>
          </div>

          {/* Score */}

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span className="font-medium">AI Score</span>
              </div>

              <span className="font-bold">{item.score}/100</span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-zinc-200">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{
                  width: `${item.score }%`,
                }}
                transition={{ duration: 1 }}
                className="h-full rounded-full bg-linear-to-r from-sky-500 to-green-500"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Question */}

          <section>
            <div className="mb-3 flex items-center gap-2 font-semibold">
              <HelpCircle className="h-5 w-5 text-sky-500" />
              Question
            </div>

            <div className="rounded-2xl bg-sky-50 p-5 leading-7">
              {item.questionText}
            </div>
          </section>

          {/* User Answer */}

          <section>
            <div className="mb-3 flex items-center gap-2 font-semibold">
              <Brain className="h-5 w-5 text-violet-500" />
              Your Answer
            </div>

            <div className="rounded-2xl border bg-white p-5 whitespace-pre-wrap leading-7">
              {item.answer}
            </div>
          </section>

          {/* Feedback */}

          {item.feedback && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <MessageSquare className="h-5 w-5" />
                  AI Feedback
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="leading-7">{item.feedback}</p>
              </CardContent>
            </Card>
          )}

          {/* Strengths & Weaknesses */}

          <div className="grid gap-5 lg:grid-cols-2">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <CheckCircle2 className="h-5 w-5" />
                  Strengths
                </CardTitle>
              </CardHeader>

              <CardContent>
                <CheckCircle2 className="mt-1 h-4 w-4 text-green-600" />

                <span>{item.strengths}</span>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <XCircle className="h-5 w-5" />
                  Weaknesses
                </CardTitle>
              </CardHeader>

              <CardContent>
                <XCircle className="mt-1 h-4 w-4 text-red-600" />

                <span>{item.weaknesses}</span>
              </CardContent>
            </Card>
          </div>

          {/* Ideal Answer */}

          <Card className="border-sky-200 bg-sky-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                Ideal Answer
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="rounded-2xl bg-white p-5 whitespace-pre-wrap leading-8 shadow-sm">
                {item.idealAnswer}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </motion.div>
  );
}
