"use client";

import { useEffect, useState } from "react";

type Props = {
  initialSeconds?: number;
  onFinished?: () => void;
};

export function Countdown({
  initialSeconds = 60,
  onFinished,
}: Props) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) {
      onFinished?.();
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, onFinished]);

  const minute = Math.floor(seconds / 60);

  const second = seconds % 60;

  return (
    <span className="text-sm text-muted-foreground">
      {minute}:{second.toString().padStart(2, "0")}
    </span>
  );
}