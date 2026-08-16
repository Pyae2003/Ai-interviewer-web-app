"use client";


import {
    motion,
    type Variants,
} from "framer-motion";

import { cn } from "@/lib/utils";


const titleContainerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            delayChildren: 0.04,
            staggerChildren: 0.055,
        },
    },
};

const titleWordVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 5,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export function AnimatedCategoryTitle({
    title,
}: {
    title: string;
}) {
    const safeTitle = title.trim() || "Untitled Category";
    const words = safeTitle.split(/\s+/);

    return (
        <motion.h3
            initial="hidden"
            whileInView="visible"
            viewport={{
                once: true,
                amount: 0.7,
            }}
            variants={titleContainerVariants}
            aria-label={safeTitle}
            className="line-clamp-2 text-lg font-bold tracking-tight text-foreground"
        >
            {words.map((word, index) => (
                <motion.span
                    key={`${word}-${index}`}
                    aria-hidden="true"
                    variants={titleWordVariants}
                    className={cn(
                        "inline-block",
                        index !== words.length - 1 && "mr-[0.24em]",
                    )}
                >
                    {word}
                </motion.span>
            ))}
        </motion.h3>
    );
}