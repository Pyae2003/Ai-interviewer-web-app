
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ProfileHeaderProps } from "../types/profile-header-types";
import { performanceStyles } from "../actions/performance-style";
import { EmailVerificationBadge } from "./email-verification-badge";



type ProfileIdentityProps = Pick<
  ProfileHeaderProps,
  "id" | "name" | "image" | "performance" | "emailVerified"
>;

export function ProfileIdentity({
  id,
  name,
  image,
  performance,
  emailVerified
}: ProfileIdentityProps) {
  const trimmedName = name.trim() || "User";
  const initial = trimmedName.charAt(0).toUpperCase();
  const headingId = `profile-${id}-name`;

  return (
    <div className="flex min-w-0 flex-col items-center gap-4 text-center sm:flex-row sm:items-end sm:text-left">
      <Avatar className="size-28 shrink-0 border-4 border-white shadow-[0_12px_35px_rgba(15,23,42,0.18)] dark:border-zinc-900">
        {image && (
          <AvatarImage
            src={image}
            alt={`${trimmedName}'s profile`}
            className="object-cover"
          />
        )}

        <AvatarFallback className="bg-linear-to-br from-sky-100 to-amber-100 text-4xl font-bold text-sky-700 dark:from-sky-950 dark:to-amber-950 dark:text-sky-400">
          {initial}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 pb-1">
        <h1
          id={headingId}
          title={trimmedName}
          className="truncate text-2xl font-bold tracking-tight text-zinc-950 mb-5 sm:text-3xl dark:text-white"
        >
          {trimmedName}
        </h1>

        <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
          <EmailVerificationBadge emailVerified={emailVerified} />

          <Badge
            variant="outline"
            className={`rounded-full px-2.5 py-1 ${
              performanceStyles[performance].badge
            }`}
          >
            {performance}
          </Badge>
        </div>
      </div>
    </div>
  );
}