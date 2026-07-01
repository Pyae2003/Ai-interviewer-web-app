"use client";

import { useEffect, useState } from "react";

const messages = [
  "Analyzing your answers...",
  "Checking technical accuracy...",
  "Evaluating problem solving...",
  "Comparing with industry standards...",
  "Generating AI feedback...",
  "Preparing final report...",
];

export function useTypingMessages() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return messages[index];
}