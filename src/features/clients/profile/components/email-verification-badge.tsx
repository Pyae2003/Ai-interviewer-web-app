import { BadgeCheck, BadgeX } from "lucide-react";

import { Badge } from "@/components/ui/badge";

type EmailVerificationBadgeProps = {
  emailVerified: boolean;
};

export function EmailVerificationBadge({
  emailVerified,
}: EmailVerificationBadgeProps) {
  return emailVerified ? (
    <Badge
      variant="outline"
      className="rounded-full border-emerald-200 bg-emerald-50 px-2.5 py-1 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300"
    >
      <BadgeCheck className="mr-1.5 size-3.5" aria-hidden="true" />
      Email verified
    </Badge>
  ) : (
    <Badge
      variant="outline"
      className="rounded-full border-amber-200 bg-amber-50 px-2.5 py-1 text-amber-700 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-300"
    >
      <BadgeX className="mr-1.5 size-3.5" aria-hidden="true" />
      Email not verified
    </Badge>
  );
}