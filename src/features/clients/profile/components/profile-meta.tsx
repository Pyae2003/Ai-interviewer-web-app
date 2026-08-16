import type { LucideIcon } from "lucide-react";
import { CalendarDays, Clock3, Mail, User } from "lucide-react";

import { cn } from "@/lib/utils";
import { ProfileHeaderProps } from "../types/profile-header-types";


const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

type ProfileMetadataProps = Pick<
  ProfileHeaderProps,
  "email" | "role" | "joined" | "lastInterview"
>;

type MetadataItemProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  iconClassName: string;
  valueClassName?: string;
};

function MetadataItem({
  icon: Icon,
  label,
  value,
  iconClassName,
  valueClassName,
}: MetadataItemProps) {
  return (
    <div className="group flex min-w-0 items-center gap-3 rounded-xl border border-border/60 bg-muted/20 px-3 py-2.5 transition-colors duration-200 hover:bg-muted/50">
      <div
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors",
          iconClassName,
        )}
      >
        <Icon className="size-4" aria-hidden="true" />
      </div>

      <div className="min-w-0">
        <dt className="text-xs text-muted-foreground">{label}</dt>

        <dd
          title={value}
          className={cn(
            "truncate font-medium text-foreground",
            valueClassName,
          )}
        >
          {value}
        </dd>
      </div>
    </div>
  );
}

export function ProfileMetadata({
  email,
  role,
  joined,
  lastInterview,
}: ProfileMetadataProps) {
  const joinedDate = dateFormatter.format(joined);

  const lastInterviewDate = lastInterview
    ? dateFormatter.format(lastInterview)
    : "No interviews yet";

  return (
    <div className="mt-6 space-y-3">
      <dl className="grid min-w-0 gap-2 md:grid-cols-3">
        <MetadataItem
          icon={Mail}
          label="Email"
          value={email}
          iconClassName="bg-sky-500/10 text-sky-500 group-hover:bg-sky-500/15"
        />

        <MetadataItem
          icon={User}
          label="Role"
          value={role.trim() || "User"}
          valueClassName="capitalize"
          iconClassName="bg-violet-500/10 text-violet-500 group-hover:bg-violet-500/15"
        />

        <MetadataItem
          icon={CalendarDays}
          label="Joined"
          value={joinedDate}
          iconClassName="bg-amber-500/10 text-amber-500 group-hover:bg-amber-500/15"
        />
      </dl>

      <div className="flex items-center gap-2 rounded-lg bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
        <Clock3 className="size-3.5 shrink-0" aria-hidden="true" />

        <span className="truncate">
          Last interview:{" "}
          <span className="font-medium text-foreground">
            {lastInterviewDate}
          </span>
        </span>
      </div>
    </div>
  );
}