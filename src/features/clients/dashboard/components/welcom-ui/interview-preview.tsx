"use client";

import {
    motion,
    type Variants,
} from "framer-motion";
import {
    Bot,
    CheckCircle2,
} from "lucide-react";


const fadeUpVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 12,
    },

    visible: {
        opacity: 1,
        y: 0,

        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
};


export function InterviewPreview() {
    const previewFeatures = [
        "Questions tailored to your category",
        "Clear and actionable AI feedback",
        "Performance and progress tracking",
    ];

    return (
        <motion.div
            variants={fadeUpVariants}
            className="rounded-2xl border border-sky-200 bg-sky-50/70 p-5 sm:p-6 dark:border-sky-900 dark:bg-sky-950/40"
        >
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500 text-white">
                        <Bot className="h-5 w-5" aria-hidden="true" />
                    </div>

                    <div>
                        <p className="font-semibold text-zinc-950 dark:text-zinc-100">
                            AI Interview Assistant
                        </p>

                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            Ready to begin your practice
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Ready
                </div>
            </div>

            <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
                <p className="text-xs font-medium uppercase tracking-wide text-sky-600 dark:text-sky-300">
                    Example question
                </p>

                <p className="mt-2 text-sm font-medium leading-6 text-zinc-800 dark:text-zinc-200">
                    Tell me about a challenging project you completed and how you solved
                    the main problem.
                </p>
            </div>

            <div className="mt-5 space-y-3">
                {previewFeatures.map((item) => (
                    <div
                        key={item}
                        className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300"
                    >
                        <CheckCircle2
                            className="h-4 w-4 shrink-0 text-sky-500"
                            aria-hidden="true"
                        />

                        <span>{item}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}