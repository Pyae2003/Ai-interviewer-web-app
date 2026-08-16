"use client";

import {
    motion,
    type Variants,
} from "framer-motion";


interface AnimatedHeadlineProps {
    className?: string;
}



const headlineWords = [
    {
        text: "Master",
        accent: false,
    },
    {
        text: "Your",
        accent: false,
    },
    {
        text: "Interview",
        accent: true,
    },
    {
        text: "Skills",
        accent: true,
    },
];


const headlineContainerVariants: Variants = {
    hidden: {},

    visible: {
        transition: {
            delayChildren: 0.08,
            staggerChildren: 0.07,
        },
    },
};

const headlineWordVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 8,
        filter: "blur(2px)",
    },

    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",

        transition: {
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
};


export function AnimatedHeadline({
    className = "",
}: AnimatedHeadlineProps) {
    return (
        <motion.h1
            initial="hidden"
            animate="visible"
            variants={headlineContainerVariants}
            aria-label="Master Your Interview Skills"
            className={className}
        >
            {headlineWords.map((word, index) => (
                <motion.span
                    key={word.text}
                    aria-hidden="true"
                    variants={headlineWordVariants}
                    className={`inline-block ${index !== headlineWords.length - 1
                            ? "mr-[0.22em]"
                            : ""
                        } ${word.accent
                            ? "text-sky-500 dark:text-sky-300"
                            : "text-zinc-950 dark:text-zinc-100"
                        }`}
                >
                    {word.text}
                </motion.span>
            ))}
        </motion.h1>
    );
}
