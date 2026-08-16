"use client";

import Link from "next/link";
import {
  motion,
  MotionConfig,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  Brain,
  Mic,
  Sparkles,
  Trophy,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedHeadline } from "./welcom-ui/animated-headline";
import { InterviewPreview } from "./welcom-ui/interview-preview";
import { FeatureCard } from "./welcom-ui/feature-card";


type Feature = {
  title: string;
  description: string;
  action: string;
  icon: typeof Mic;
};


const features: Feature[] = [
  {
    title: "Real Interview Practice",
    description:
      "Practice category-based questions designed to simulate real technical interviews.",
    action: "Start practicing",
    icon: Mic,
  },
  {
    title: "Smart AI Feedback",
    description:
      "Receive clear feedback about your strengths, weaknesses, and areas for improvement.",
    action: "Improve your skills",
    icon: Brain,
  },
  {
    title: "Track Your Progress",
    description:
      "Monitor interview scores and understand how your performance improves over time.",
    action: "View your progress",
    icon: Trophy,
  },
];

const heroContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.1,
    },
  },
};

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


const featureContainerVariants: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};



export default function WelcomeProfilePage() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          {/* HERO */}
          <Card className="overflow-hidden border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="h-1 bg-sky-500" />

            <CardContent className="p-7 sm:p-10 lg:p-12">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={heroContainerVariants}
                className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]"
              >
                <div>
                  <motion.div
                    variants={fadeUpVariants}
                    className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3.5 py-1.5 text-sm font-medium text-sky-700 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-300"
                  >
                    <Sparkles
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                    AI-powered interview preparation
                  </motion.div>

                  <AnimatedHeadline className="max-w-3xl text-balance text-4xl font-bold leading-tight tracking-[-0.04em] sm:text-5xl lg:text-6xl" />

                  <motion.p
                    variants={fadeUpVariants}
                    className="mt-5 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8 dark:text-zinc-300"
                  >
                    Practice real interview questions, receive useful AI
                    feedback, track your progress, and build confidence before
                    your next interview.
                  </motion.p>

                  <motion.div
                    variants={fadeUpVariants}
                    className="mt-8 flex flex-col gap-3 sm:flex-row"
                  >
                    <Button
                      asChild
                      size="lg"
                      className="rounded-xl bg-sky-600 font-semibold text-white shadow-sm hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-500"
                    >
                      <Link href="/dashboard">
                        Start Interview
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="rounded-xl border-zinc-200 bg-white text-zinc-700 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-sky-900 dark:hover:bg-sky-950 dark:hover:text-sky-300"
                    >
                      <Link href="/history">View History</Link>
                    </Button>
                  </motion.div>
                </div>

                <InterviewPreview />
              </motion.div>
            </CardContent>
          </Card>

          {/* FEATURES */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={featureContainerVariants}
            aria-label="Platform features"
            className="mt-8 grid gap-5 md:grid-cols-3"
          >
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
              />
            ))}
          </motion.section>

          {/* FINAL CTA */}
          <motion.div
            initial={{
              opacity: 0,
              y: 16,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Card className="mt-8 overflow-hidden border-sky-600 bg-sky-600 shadow-sm">
              <CardContent className="p-8 text-center sm:p-10">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-white">
                  <Sparkles className="h-6 w-6" aria-hidden="true" />
                </div>

                <h2 className="mt-4 text-2xl font-bold text-white">
                  Ready to improve your interview skills?
                </h2>

                <p className="mx-auto mt-3 max-w-2xl leading-7 text-sky-100">
                  Start practicing today and receive useful feedback after
                  every interview session.
                </p>

                <Button
                  asChild
                  size="lg"
                  className="mt-6 rounded-xl bg-white font-semibold text-sky-700 shadow-sm hover:bg-sky-50"
                >
                  <Link href="/dashboard">
                    Begin Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </MotionConfig>
  );
}