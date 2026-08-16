"use client";

import {
    motion,
} from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";



export function CategoryStatusBadge({
    isActive,
}: {
    isActive: boolean;
}) {
    return (
        <Badge
            variant="outline"
            className={cn(
                "shrink-0 rounded-full px-2.5 py-1 font-medium",
                isActive
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/50 dark:text-emerald-400"
                    : "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/50 dark:text-red-400",
            )}
        >
            {isActive ? (
                <motion.span
                    aria-hidden="true"
                    animate={{
                        scale: [0.8, 1, 0.8],
                        opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="mr-1.5 size-1.5 rounded-full bg-current"
                />
            ) : (
                <span
                    aria-hidden="true"
                    className="mr-1.5 size-1.5 rounded-full bg-current"
                />
            )}

            {isActive ? "Active" : "Inactive"}
        </Badge>
    );
}
