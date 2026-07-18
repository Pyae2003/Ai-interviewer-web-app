"use client";

import { useEffect, useState } from "react";

const PROCESSING_MESSAGES = [
  "Analyzing your answers...",
  "Checking technical accuracy...",
  "Evaluating problem-solving skills...",
  "Comparing with industry standards...",
  "Generating personalized feedback...",
  "Preparing your final report...",
] as const;

const MESSAGE_INTERVAL = 2800;

export function useTypingMessages() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let isActive = true;

    const showNextMessage = () => {
      if (!isActive) return;

      setIndex(
        (currentIndex) =>
          (currentIndex + 1) %
          PROCESSING_MESSAGES.length,
      );

      timeoutId = setTimeout(
        showNextMessage,
        MESSAGE_INTERVAL,
      );
    };

    timeoutId = setTimeout(
      showNextMessage,
      MESSAGE_INTERVAL,
    );

    return () => {
      isActive = false;
      clearTimeout(timeoutId);
    };
  }, []);

  return PROCESSING_MESSAGES[index];
}