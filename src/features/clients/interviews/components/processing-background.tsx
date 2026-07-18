"use client";

import { motion, MotionConfig, type Variants } from "framer-motion";

type Orb = {
  id: string;
  size: number;
  className: string;
  position: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  duration: number;
  delay: number;
};

const orbs: Orb[] = [
  {
    id: "sky",
    size: 280,
    position: {
      top: "4%",
      left: "2%",
    },
    className: "bg-sky-300/35 dark:bg-sky-700/15",
    duration: 16,
    delay: 0,
  },
  {
    id: "yellow",
    size: 220,
    position: {
      bottom: "5%",
      left: "12%",
    },
    className: "bg-yellow-300/30 dark:bg-yellow-700/10",
    duration: 18,
    delay: 1.5,
  },
  {
    id: "cyan",
    size: 320,
    position: {
      top: "12%",
      right: "0%",
    },
    className: "bg-cyan-300/30 dark:bg-cyan-700/10",
    duration: 20,
    delay: 0.8,
  },
];

const orbVariants: Variants = {
  initial: {
    x: 0,
    y: 0,
    scale: 1,
  },
  animate: {
    x: [0, 8, 0],
    y: [0, -12, 0],
    scale: [1, 1.025, 1],
  },
};

export default function ProcessingBackground() {
  return (
    <MotionConfig reducedMotion="user">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {/* Soft base gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-sky-50/80 via-white to-yellow-50/70 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900" />

        {/* Subtle top light */}
        <div className="absolute inset-x-0 top-0 h-64 bg-linear-to-b from-white/70 to-transparent dark:from-white/[0.03]" />

        {/* Animated ambient orbs */}
        {orbs.map((orb) => (
          <motion.div
            key={orb.id}
            initial="initial"
            animate="animate"
            variants={orbVariants}
            transition={{
              duration: orb.duration,
              delay: orb.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute rounded-full blur-3xl ${orb.className}`}
            style={{
              width: orb.size,
              height: orb.size,
              ...orb.position,
            }}
          />
        ))}

        {/* Gentle center glow */}
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 blur-3xl dark:bg-white/[0.015]" />
      </div>
    </MotionConfig>
  );
}
