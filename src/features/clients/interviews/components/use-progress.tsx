"use client";

import { useEffect, useState } from "react";

const MAX_PROGRESS = 95;
const UPDATE_INTERVAL = 650;

export function useProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let isActive = true;

    const updateProgress = () => {
      if (!isActive) return;

      setProgress((currentProgress) => {
        if (currentProgress >= MAX_PROGRESS) {
          return MAX_PROGRESS;
        }

        const remaining =
          MAX_PROGRESS - currentProgress;

        /*
         * Progress starts faster and gradually slows
         * as it approaches 95%.
         */
        const increment = Math.max(
          0.2,
          remaining * 0.055,
        );

        return Math.min(
          currentProgress + increment,
          MAX_PROGRESS,
        );
      });

      timeoutId = setTimeout(
        updateProgress,
        UPDATE_INTERVAL,
      );
    };

    timeoutId = setTimeout(updateProgress, 350);

    return () => {
      isActive = false;
      clearTimeout(timeoutId);
    };
  }, []);

  return progress;
}