"use client";

import { motion } from "framer-motion";
import {
    Calendar,
    CheckCircle2,
    FileQuestion,
    Trophy,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { AnimatedCategoryTitle } from "./animated-category-title";
import { InterviewHistorySummary } from "../../types/ interview-history.types";
import { HistoryPerformanceProgress } from "./history-performance-progress";
import { HistoryStatCard } from "./history-stat-card";


type HistorySummaryCardProps = {
    categoryName: string;
    summary: InterviewHistorySummary;
};

export function HistorySummaryCard({
    categoryName,
    summary,
}: HistorySummaryCardProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
            }}
            aria-label="Interview result summary"
        >
            <Card className="relative overflow-hidden rounded-3xl border border-sky-200/80 bg-card shadow-[0_22px_65px_rgba(15,23,42,0.09)] dark:border-sky-900/60">
                <div
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-1 bg-sky-500"
                />

                <CardContent className="p-6 pl-7 sm:p-8 sm:pl-9">
                    <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                        <div className="min-w-0">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-sky-700 shadow-sm dark:border-sky-900/70 dark:bg-sky-950/50 dark:text-sky-400">
                                <FileQuestion className="size-3.5" aria-hidden="true" />
                                Interview result
                            </div>

                            <AnimatedCategoryTitle title={categoryName} />

                            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                                <span className="flex size-8 items-center justify-center rounded-lg border border-sky-200 bg-sky-50 text-sky-600 dark:border-sky-900/70 dark:bg-sky-950/50 dark:text-sky-400">
                                    <Calendar className="size-4" aria-hidden="true" />
                                </span>

                                <span>Completed on {summary.completedDate}</span>
                            </div>
                        </div>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            transition={{
                                type: "spring",
                                stiffness: 350,
                                damping: 22,
                            }}
                            className={cn(
                                "flex shrink-0 items-center gap-4 rounded-2xl border px-5 py-4 shadow-sm",
                                summary.passed
                                    ? "border-emerald-200 bg-emerald-50/70 dark:border-emerald-900/60 dark:bg-emerald-950/35"
                                    : "border-amber-200 bg-amber-50/70 dark:border-amber-900/60 dark:bg-amber-950/35",
                            )}
                        >
                            <div
                                className={cn(
                                    "flex size-12 items-center justify-center rounded-2xl border bg-background shadow-sm",
                                    summary.passed
                                        ? "border-emerald-200 text-emerald-600 dark:border-emerald-900 dark:text-emerald-400"
                                        : "border-amber-200 text-amber-600 dark:border-amber-900 dark:text-amber-400",
                                )}
                            >
                                <Trophy className="size-6" aria-hidden="true" />
                            </div>

                            <div>
                                <div className="flex items-end gap-1">
                                    <span className="text-3xl font-bold tracking-tight text-foreground">
                                        {summary.score}
                                    </span>

                                    <span className="mb-1 text-sm text-muted-foreground">
                                        / {summary.maximumScore}
                                    </span>
                                </div>

                                <p className="text-xs font-medium text-muted-foreground">
                                    Overall score
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    <div className="mt-8">
                        <HistoryPerformanceProgress
                            percentage={summary.percentage}
                        />
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <HistoryStatCard
                            icon={FileQuestion}
                            value={summary.totalQuestions}
                            label="Total questions"
                            tone="sky"
                        />

                        <HistoryStatCard
                            icon={CheckCircle2}
                            value={summary.correctAnswers}
                            label="Correct answers"
                            tone="emerald"
                        />
                    </div>
                </CardContent>
            </Card>
        </motion.section>
    );
}
