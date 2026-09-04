// components/reactions.ts

import type { ReactionType } from "@/generated/prisma/client";

export const REACTIONS: {
  type: ReactionType;
  emoji: string;
  label: string;
}[] = [
  {
    type: "LIKE",
    emoji: "👍",
    label: "Like",
  },
  {
    type: "LOVE",
    emoji: "❤️",
    label: "Love",
  },
  {
    type: "HAHA",
    emoji: "😂",
    label: "Haha",
  },
  {
    type: "WOW",
    emoji: "😮",
    label: "Wow",
  },
  {
    type: "SAD",
    emoji: "😢",
    label: "Sad",
  },
  {
    type: "ANGRY",
    emoji: "😡",
    label: "Angry",
  },
];