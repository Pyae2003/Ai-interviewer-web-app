"use client";

import Link from "next/link";

import {
  Calendar,
  Trophy,
  ArrowRight,
  CheckCircle2,
  FileQuestion,
} from "lucide-react";

import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { histroyDetailPath } from "@/constants/route";

type InterViewListProp = {
  result: {
    categoryId: string;
    categoryName: string;
    interviews: {
      id: string;
      score: number | null;
      status: string;
      createdAt: Date;
      totalQuestions: number;
      answeredQuestions: number;
    }[];
  };
};

export default function InterViewList({ result }: InterViewListProp) {
  return (
    <section className="space-y-6">
\
      <div className="flex items-center gap-4">
        <div className="h-12 w-1.5 rounded-full bg-linear-to-b from-sky-500 to-yellow-400" />

        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {result.categoryName}
          </h2>

          <p className="text-sm text-muted-foreground">
            {result.interviews.length} Interview
            {result.interviews.length > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {result.interviews.map((interview, index) => {
          const score = interview.score ?? 0;

          return (
            <motion.div
              key={interview.id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.08,
              }}
            >
              <Card className="group h-full overflow-hidden border-0 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <div className="h-2 bg-linear-to-r from-sky-500 via-cyan-400 to-yellow-400" />

                <CardContent className="space-y-6 p-6">
                  <div className="flex items-center justify-between">
                    <Badge
                      className={
                        interview.status === "COMPLETED"
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                      }
                    >
                      {interview.status}
                    </Badge>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-4 w-4" />

                      {new Date(interview.createdAt).toLocaleDateString(
                        "en-GB",
                        { day: "2-digit", month: "long", year: "numeric" },
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-5">
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-sky-100 to-yellow-100">
                      <Trophy className="absolute h-7 w-7 text-yellow-500" />

                      <span className="text-xl font-bold">{score}</span>
                    </div>

                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">
                        Overall Score
                      </p>

                      <h3 className="text-3xl font-bold">{score}%</h3>

                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-200">
                        <div
                          className="h-full rounded-full bg-linear-to-r from-sky-500 to-yellow-400 transition-all duration-1000"
                          style={{
                            width: `${score}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Stats */}

                  <div className="grid grid-cols-2 gap-4 rounded-2xl bg-zinc-50 p-4">
                    <div className="flex items-center gap-2">
                      <FileQuestion className="h-5 w-5 text-sky-500" />

                      <div>
                        <p className="text-xs text-muted-foreground">
                          Questions
                        </p>

                        <p className="font-semibold">
                          {interview.totalQuestions}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />

                      <div>
                        <p className="text-xs text-muted-foreground">
                          Answered
                        </p>

                        <p className="font-semibold">
                          {interview.answeredQuestions}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    asChild
                    className="group/button w-full rounded-xl bg-linear-to-r from-sky-500 to-yellow-400 text-black shadow-lg transition-all hover:scale-[1.02]"
                  >
                    <Link href={histroyDetailPath(interview.id)}>
                      View Interview
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
