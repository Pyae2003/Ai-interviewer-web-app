"use client";

import { motion } from "framer-motion";

const circles = [
  {
    size: 260,
    top: "8%",
    left: "5%",
    color: "bg-sky-300",
  },
  {
    size: 200,
    top: "70%",
    left: "15%",
    color: "bg-yellow-300",
  },
  {
    size: 300,
    top: "15%",
    right: "5%",
    color: "bg-cyan-300",
  },
  {
    size: 220,
    bottom: "10%",
    right: "15%",
    color: "bg-blue-300",
  },
];

export default function ProcessingBackground() {
  return (
    <>
      {circles.map((circle, index) => (
        <motion.div
          key={index}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10 + index * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute rounded-full blur-3xl opacity-25 ${circle.color}`}
          style={{
            width: circle.size,
            height: circle.size,
            top: circle.top,
            left: circle.left,
            right: circle.right,
            bottom: circle.bottom,
          }}
        />
      ))}
    </>
  );
}