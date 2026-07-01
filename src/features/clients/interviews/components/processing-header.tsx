"use client";

import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";

export default function ProcessingHeader() {
  return (
    <div className="text-center">

      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-linear-to-br from-sky-400 to-yellow-300 shadow-2xl"
      >
        <BrainCircuit
          className="h-14 w-14 text-white"
        />
      </motion.div>

      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="text-4xl font-extrabold md:text-5xl"
      >
        AI is analyzing your interview
      </motion.h1>

      <motion.p
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.4,
        }}
        className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground"
      >
        Our AI is reviewing your answers, checking technical
        accuracy, generating personalized feedback and preparing
        your interview report.
      </motion.p>

    </div>
  );
}