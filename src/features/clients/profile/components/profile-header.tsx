import { Pencil } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { editProfilePath } from "@/constants/route";


import { ProfileStats } from "./profile-stats";
import { ProfileHeaderProps } from "../types/profile-header-types";
import { ProfileIdentity } from "./profile-identify";
import { ProfileMetadata } from "./profile-meta";

export default function ProfileHeader(props: ProfileHeaderProps) {
  const {
    id,
    name,
    image,
    performance,
    email,
    role,
    joined,
    lastInterview,
    totalInterviews,
    totalCategories,
    averageScore,
    bestScore,
  } = props;

  return (
    <section
      aria-labelledby={`profile-${id}-name`}
      className="relative overflow-hidden rounded-3xl border border-black/5 bg-white/85 shadow-[0_24px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/80"
    >
      {/* Cover */}
      <div className="relative h-28 overflow-hidden bg-linear-to-r from-sky-100 via-blue-100 to-violet-100 sm:h-44">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-b from-white/10 to-black/15"
        />

        <div
          aria-hidden="true"
          className="absolute -right-20 -top-24 size-64 rounded-full bg-white/25 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="absolute -bottom-32 left-1/4 size-64 rounded-full bg-amber-100/25 blur-3xl"
        />
      </div>

      <div className="relative px-5 pb-7 sm:px-7 sm:pb-8">
        {/* Identity and action */}
        <div className="-mt-14 flex flex-col gap-6 sm:-mt-16 lg:flex-row lg:items-end lg:justify-between">
          <ProfileIdentity
            id={id}
            name={name}
            image={image}
            performance={performance}
          />

          <Button
            asChild
            size="lg"
            className="h-11 w-full shrink-0 rounded-xl bg-zinc-950 px-5 font-semibold text-white shadow-sm transition-[background-color,box-shadow] duration-200 hover:bg-zinc-800 hover:shadow-md lg:w-auto dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            <Link href={editProfilePath}>
              <Pencil className="mr-2 size-4" aria-hidden="true" />
              Edit Profile
            </Link>
          </Button>
        </div>

        <ProfileMetadata
          email={email}
          role={role}
          joined={joined}
          lastInterview={lastInterview}
        />

        <ProfileStats
          totalInterviews={totalInterviews}
          totalCategories={totalCategories}
          averageScore={averageScore}
          bestScore={bestScore}
          performance={performance}
        />
      </div>
    </section>
  );
}