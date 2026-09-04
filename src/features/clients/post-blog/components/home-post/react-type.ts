import type { ReactionType } from "@/generated/prisma/client";

export type ReactionSummary = {
  type: ReactionType;
  count: number;
};

export type ReactionUpdate = {
  reaction: ReactionType | null;
  reactionCount: number;
  reactions: ReactionSummary[];
};