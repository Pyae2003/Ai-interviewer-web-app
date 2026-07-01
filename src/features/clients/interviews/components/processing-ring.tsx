"use client";

import { motion } from "framer-motion";

type Props = {
  progress: number;
};

export default function ProgressRing({ progress }: Props) {
  const radius = 70;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference - (progress / 100) * circumference;

  return (
    <div className="flex items-center justify-center">
      <svg height={160} width={160}>
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={80}
          cy={80}
        />

        <motion.circle
          stroke="url(#grad)"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={80}
          cy={80}
          strokeDasharray={circumference}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.5 }}
        />

        <defs>
          <linearGradient id="grad">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#facc15" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute text-2xl font-bold">
        {Math.round(progress)}%
      </div>
    </div>
  );
}