import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const toneStyles = {
  sky: {
    icon: "text-sky-600 dark:text-sky-400",
    content:
      "border-sky-200/80 bg-sky-50/65 dark:border-sky-900/60 dark:bg-sky-950/30",
  },
  violet: {
    icon: "text-violet-600 dark:text-violet-400",
    content:
      "border-violet-200/80 bg-violet-50/55 dark:border-violet-900/60 dark:bg-violet-950/25",
  },
} as const;

type ResponseContentTone = keyof typeof toneStyles;

type ResponseContentSectionProps = {
  id: string;
  icon: LucideIcon;
  title: string;
  content: string;
  fallback: string;
  tone: ResponseContentTone;
};

export function ResponseContentSection({
  id,
  icon: Icon,
  title,
  content,
  fallback,
  tone,
}: ResponseContentSectionProps) {
  const styles = toneStyles[tone];

  return (
    <section aria-labelledby={id}>
      <div
        id={id}
        className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground"
      >
        <Icon className={cn("size-4", styles.icon)} aria-hidden="true" />
        {title}
      </div>

      <div
        className={cn(
          "whitespace-pre-wrap rounded-2xl border p-5 text-sm leading-7 text-foreground/85 sm:text-base",
          styles.content,
        )}
      >
        {content.trim() || fallback}
      </div>
    </section>
  );
}
