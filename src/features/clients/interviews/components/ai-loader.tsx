"use client";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";

export default function AiLoader() {
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        className="rounded-full bg-linear-to-br from-sky-400 to-yellow-300 p-5 shadow-xl"
      >
        <Bot className="h-10 w-10 text-white" />
      </motion.div>

      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-sm text-muted-foreground"
      >
        AI is thinking...
      </motion.div>
    </div>
  );
}