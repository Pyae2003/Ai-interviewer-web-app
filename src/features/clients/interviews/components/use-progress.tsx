"use client";

import { useEffect, useState } from "react";

export function useProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev; // stop at 95 until backend finishes
        return prev + Math.random() * 3;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return Math.min(progress, 95);
}