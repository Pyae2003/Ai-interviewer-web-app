"use client";

import { motion } from "framer-motion";

type Props = {
  progress: number;
};

export default function ProgressBar({ progress }: Props) {
  return (
    <div className="h-3 w-full rounded-full bg-zinc-200 overflow-hidden">
      <motion.div
        className="h-full rounded-full bg-linear-to-r from-sky-400 to-yellow-300"
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
}