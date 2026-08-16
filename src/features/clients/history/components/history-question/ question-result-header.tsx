import { CheckCircle2, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AnimatedQuestionTitle } from "./animated-question-title";
import { QuestionResult } from "../../types/ interview-history.types";
import { difficultyBadgeStyles } from "../../query/history-question.utils";
import { AiScoreProgress } from "./ai-score-progress";



type QuestionResultHeaderProps = {
    item: QuestionResult;
    index: number;
    score: number;
};

export function QuestionResultHeader({
    item,
    index,
    score,
}: QuestionResultHeaderProps) {
    return (
        <CardHeader className="space-y-6 border-b border-border/70 px-5 pb-6 pt-7 sm:px-7">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div>
                    <AnimatedQuestionTitle index={index} />

                    <p className="mt-1.5 text-sm text-muted-foreground">
                        AI evaluation and performance breakdown
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Badge
                        variant="outline"
                        className={cn(
                            "rounded-full px-2.5 py-1",
                            difficultyBadgeStyles[item.difficulty],
                        )}
                    >
                        {item.difficulty}
                    </Badge>

                    <Badge
                        variant="outline"
                        className={cn(
                            "rounded-full px-2.5 py-1",
                            item.isCorrect
                                ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/50 dark:text-emerald-400"
                                : "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/50 dark:text-red-400",
                        )}
                    >
                        {item.isCorrect ? (
                            <CheckCircle2
                                className="mr-1.5 size-3.5"
                                aria-hidden="true"
                            />
                        ) : (
                            <XCircle
                                className="mr-1.5 size-3.5"
                                aria-hidden="true"
                            />
                        )}

                        {item.isCorrect ? "Correct" : "Incorrect"}
                    </Badge>

                    <Badge
                        variant="outline"
                        className="rounded-full border-border bg-background px-2.5 py-1 text-foreground"
                    >
                        {score}/100
                    </Badge>
                </div>
            </div>

            <AiScoreProgress score={score} />
        </CardHeader>
    );
}
