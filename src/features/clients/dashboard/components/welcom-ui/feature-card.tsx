"use client";

import {
  motion,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  Mic,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type Feature = {
  title: string;
  description: string;
  action: string;
  icon: typeof Mic;
};



const featureCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
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

export function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;

  return (
    <motion.div
      variants={featureCardVariants}
      whileHover={{
        y: -4,

        transition: {
          duration: 0.2,
          ease: "easeOut",
        },
      }}
      className="h-full"
    >
      <Card className="group h-full border-zinc-200 bg-white shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-sky-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-sky-900">
        <CardContent className="flex h-full flex-col p-6">
          <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-xl bg-sky-100 text-sky-600 transition-colors duration-200 group-hover:bg-sky-500 group-hover:text-white dark:bg-sky-950 dark:text-sky-300 dark:group-hover:bg-sky-600">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>

          <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-100">
            {feature.title}
          </h2>

          <p className="mt-2 flex-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
            {feature.description}
          </p>

          <div className="mt-5 flex items-center text-sm font-medium text-sky-600 dark:text-sky-300">
            {feature.action}

            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}