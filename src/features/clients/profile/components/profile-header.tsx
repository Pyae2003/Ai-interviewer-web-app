"use client";

import { motion, MotionConfig, type Variants } from "framer-motion";
import {
  BadgeCheck,
  BarChart3,
  CalendarDays,
  FolderOpen,
  Mail,
  Pencil,
  Sparkles,
  Trophy,
  User,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { editProfilePath } from "@/constants/route";

type Props = {
  id: string;
  name: string;
  email: string;
  role: string;
  image: string | null;
  joined: Date;

  totalInterviews: number;
  totalCategories: number;

  averageScore: number;
  bestScore: number;

  lastInterview: Date | null;

  performance:
    "Excellent" | "Very Good" | "Good" | "Average" | "Needs Improvement";
};

const nameContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.06,
      staggerChildren: 0.06,
    },
  },
};

const nameWordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 5,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.44,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function AnimatedProfileName({ name }: { name: string }) {
  const words = name.trim().split(/\s+/);

  return (
    <MotionConfig reducedMotion="user">
      <motion.h1
        initial="hidden"
        animate="visible"
        variants={nameContainerVariants}
        aria-label={name}
        className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl dark:text-white"
      >
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            aria-hidden="true"
            variants={nameWordVariants}
            className={
              index === words.length - 1
                ? "inline-block bg-linear-to-r from-purple-500 to-red-500 bg-clip-text text-transparent"
                : "mr-[0.22em] inline-block"
            }
          >
            {word}
          </motion.span>
        ))}
      </motion.h1>
    </MotionConfig>
  );
}

function getPerformanceClasses(performance: Props["performance"]) {
  switch (performance) {
    case "Excellent":
      return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/50 dark:text-emerald-400";

    case "Very Good":
      return "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900/60 dark:bg-sky-950/50 dark:text-sky-400";

    case "Good":
      return "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/50 dark:text-blue-400";

    case "Average":
      return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/60 dark:bg-amber-950/50 dark:text-amber-400";

    default:
      return "border-red-200 bg-red-50 text-red-700 dark:border-red-900/60 dark:bg-red-950/50 dark:text-red-400";
  }
}

export default function ProfileHeader({
  name,
  email,
  role,
  image,
  joined,
  totalInterviews,
  totalCategories,
  performance,
  averageScore,
  bestScore,
  lastInterview,
}: Props) {
  const trimmedName = name.trim() || "User";
  const initial = trimmedName.charAt(0).toUpperCase();

  const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  const joinedDate = dateFormatter.format(new Date(joined));

  const lastInterviewDate = lastInterview
    ? dateFormatter.format(new Date(lastInterview))
    : "No interviews yet";

  const safeAverageScore = Math.min(100, Math.max(0, averageScore));

  const safeBestScore = Math.min(100, Math.max(0, bestScore));

  const stats = [
    {
      label: "Interviews",
      value: totalInterviews,
      detail: "Completed sessions",
      icon: Trophy,
      containerClass:
        "border-sky-100 bg-sky-50/70 dark:border-sky-900/50 dark:bg-sky-950/30",
      iconClass: "bg-white text-sky-600 dark:bg-zinc-900 dark:text-sky-400",
    },
    {
      label: "Average Score",
      value: `${safeAverageScore}%`,
      detail: `Best score ${safeBestScore}%`,
      icon: BarChart3,
      containerClass:
        "border-yellow-100 bg-yellow-50/70 dark:border-yellow-900/50 dark:bg-yellow-950/30",
      iconClass:
        "bg-white text-yellow-600 dark:bg-zinc-900 dark:text-yellow-400",
    },
    {
      label: "Performance",
      value: performance,
      detail: "Current performance level",
      icon: Sparkles,
      containerClass:
        "border-emerald-100 bg-emerald-50/70 dark:border-emerald-900/50 dark:bg-emerald-950/30",
      iconClass:
        "bg-white text-emerald-600 dark:bg-zinc-900 dark:text-emerald-400",
    },
    {
      label: "Categories",
      value: totalCategories,
      detail: "Categories practiced",
      icon: FolderOpen,
      containerClass:
        "border-violet-100 bg-violet-50/70 dark:border-violet-900/50 dark:bg-violet-950/30",
      iconClass:
        "bg-white text-violet-600 dark:bg-zinc-900 dark:text-violet-400",
    },
  ];

  return (
    <section className="relative overflow-hidden rounded-3xl border border-black/5 bg-white/85 shadow-[0_24px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/80">
      {/* Cover */}
      <div className="relative h-40 overflow-hidden bg-linear-to-r from-sky-500 via-cyan-400 to-yellow-400 sm:h-44">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-b from-white/5 to-black/10"
        />

        <div
          aria-hidden="true"
          className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/25 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="absolute -bottom-32 left-1/4 h-64 w-64 rounded-full bg-yellow-100/25 blur-3xl"
        />
      </div>

      <div className="relative px-5 pb-7 sm:px-7 sm:pb-8">
        {/* Profile information */}
        <div className="-mt-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-end">
            {/* Avatar */}
            <Avatar className="h-28 w-28 shrink-0 border-4 border-white shadow-[0_12px_35px_rgba(15,23,42,0.18)] dark:border-zinc-900">
              {image && (
                <AvatarImage
                  src={image}
                  alt={`${trimmedName}'s profile`}
                  className="object-cover"
                />
              )}

              <AvatarFallback className="bg-linear-to-br from-sky-100 to-yellow-100 text-4xl font-bold text-sky-700 dark:from-sky-950 dark:to-yellow-950 dark:text-sky-400">
                {initial}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 space-y-3 pb-1">
              <div className="flex flex-wrap items-center gap-3">
                <AnimatedProfileName name={trimmedName} />

                <Badge
                  variant="outline"
                  className="rounded-full border-emerald-200 bg-emerald-50 px-2.5 py-1 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/50 dark:text-emerald-400"
                >
                  <BadgeCheck
                    className="mr-1.5 h-3.5 w-3.5"
                    aria-hidden="true"
                  />
                  Verified
                </Badge>

                <Badge
                  variant="outline"
                  className={`rounded-full px-2.5 py-1 ${getPerformanceClasses(
                    performance,
                  )}`}
                >
                  {performance}
                </Badge>
              </div>

              {/* User metadata */}
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-500 dark:text-zinc-400">
                <div className="flex min-w-0 items-center gap-2">
                  <Mail
                    className="h-4 w-4 shrink-0 text-sky-500"
                    aria-hidden="true"
                  />

                  <span className="truncate">{email}</span>
                </div>

                <div className="flex items-center gap-2">
                  <User
                    className="h-4 w-4 text-violet-500"
                    aria-hidden="true"
                  />

                  <span className="capitalize">{role}</span>
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays
                    className="h-4 w-4 text-yellow-500"
                    aria-hidden="true"
                  />

                  <span>Joined {joinedDate}</span>
                </div>
              </div>

              <p className="text-xs text-zinc-400 dark:text-zinc-500">
                Last interview: {lastInterviewDate}
              </p>
            </div>
          </div>

          <Button
            type="button"
            size="lg"
            className="h-11 shrink-0 rounded-xl bg-zinc-950 px-5 font-semibold text-white shadow-sm transition-[background-color,box-shadow] duration-200 hover:bg-zinc-800 hover:shadow-md dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            <Link href={editProfilePath}>
              <Pencil className="mr-2 h-4 w-4" aria-hidden="true" />
              Edit Profile
            </Link>
          </Button>
        </div>

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className={`group rounded-2xl border p-4 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md sm:p-5 ${stat.containerClass}`}
              >
                <div
                  className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl shadow-sm ${stat.iconClass}`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>

                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  {stat.label}
                </p>

                <p
                  className={
                    stat.label === "Performance"
                      ? "mt-2 line-clamp-1 text-xl font-bold tracking-tight text-zinc-950 sm:text-2xl dark:text-white"
                      : "mt-2 text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl dark:text-white"
                  }
                >
                  {stat.value}
                </p>

                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  {stat.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
