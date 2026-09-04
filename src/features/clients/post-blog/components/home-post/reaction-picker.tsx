"use client";

import type { ReactionType } from "@/generated/prisma/client";
import { REACTIONS } from "../../query/reaction";


type ReactionPickerProps = {
  onSelect: (reaction: ReactionType) => void;
  disabled?: boolean;
};

export function ReactionPicker({
  onSelect,
  disabled = false,
}: ReactionPickerProps) {
  return (
    <div
      className="
        absolute bottom-full left-0 z-50 mb-2
        flex items-center gap-1
        rounded-full
        border border-slate-200
        bg-white
        px-2 py-2
        shadow-xl
        animate-in
        fade-in
        zoom-in-95
        slide-in-from-bottom-2
        duration-150
        dark:border-slate-800
        dark:bg-slate-950
      "
      role="menu"
    >
      {REACTIONS.map((reaction) => (
        <button
          key={reaction.type}
          type="button"
          title={reaction.label}
          aria-label={reaction.label}
          disabled={disabled}
          onClick={() => onSelect(reaction.type)}
          className="
            flex size-10 items-center justify-center
            rounded-full
            text-2xl
            transition-transform
            duration-150
            hover:scale-125
            active:scale-95
            disabled:pointer-events-none
            disabled:opacity-50
          "
        >
          {reaction.emoji}
        </button>
      ))}
    </div>
  );
}