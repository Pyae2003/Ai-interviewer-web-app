"use client";

import Link from "next/link";
import { useState } from "react";
import {
  motion,
  MotionConfig,
  type Variants,
} from "framer-motion";
import {
  ChevronDown,
  LayoutDashboard,
  Settings,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "./logout";

type UserProfileProps = {
  id: string;
  name: string;
  email: string;
  image?: string;
};

interface AnimatedNameProps {
  name: string;
  className?: string;
}

const nameContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.05,
      staggerChildren: 0.055,
    },
  },
};

const nameWordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 4,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function AnimatedName({
  name,
  className = "",
}: AnimatedNameProps) {
  const words = name.trim().split(/\s+/);

  return (
    <MotionConfig reducedMotion="user">
      <motion.span
        initial="hidden"
        animate="visible"
        variants={nameContainerVariants}
        aria-label={name}
        className={className}
      >
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            aria-hidden="true"
            variants={nameWordVariants}
            className={
              index === words.length - 1
                ? "inline-block"
                : "mr-[0.25em] inline-block"
            }
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </MotionConfig>
  );
}

export default function UserProfile({
  name,
  email,
  image
}: UserProfileProps) {
  const [open, setOpen] = useState(false);

  const trimmedName = name?.trim() || "User";
  const initial = trimmedName.charAt(0).toUpperCase();

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          aria-label={`Open profile menu for ${trimmedName}`}
          className="group h-auto rounded-2xl border border-transparent px-2 py-1.5 transition-colors duration-200 hover:border-black/5 hover:bg-white/80 hover:shadow-sm data-[state=open]:border-black/5 data-[state=open]:bg-white data-[state=open]:shadow-sm dark:hover:border-white/10 dark:hover:bg-white/5 dark:data-[state=open]:border-white/10 dark:data-[state=open]:bg-white/5"
        >
          <div className="flex items-center gap-2.5">
             <Avatar className="h-10 w-10 shrink-0 border-4 border-white shadow-[0_12px_35px_rgba(15,23,42,0.18)] dark:border-zinc-900">
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

            {/* Desktop user details */}
            <div className="hidden min-w-0 flex-col items-start leading-tight sm:flex">
              <span className="max-w-36 truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {trimmedName}
              </span>

              <span className="mt-0.5 max-w-44 truncate text-xs font-normal text-zinc-500 dark:text-zinc-400">
                {email}
              </span>
            </div>

            <ChevronDown
              aria-hidden="true"
              className={`hidden h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200 sm:block ${open ? "rotate-180" : "rotate-0"
                }`}
            />
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-72 overflow-hidden rounded-2xl border-black/5 bg-white/95 p-1.5 shadow-[0_20px_60px_rgba(15,23,42,0.16)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/95"
      >
        {/* Profile header */}
        <DropdownMenuLabel className="p-3 font-normal">
          <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 shrink-0 border-4 border-white shadow-[0_12px_35px_rgba(15,23,42,0.18)] dark:border-zinc-900">
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

            <div className="min-w-0">
              <AnimatedName
                name={trimmedName}
                className="block truncate text-sm font-semibold text-zinc-950 dark:text-white"
              />

              <p className="mt-1 truncate text-xs text-zinc-500 dark:text-zinc-400">
                {email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="mx-2 bg-black/5 dark:bg-white/10" />

        <div className="p-1">
          <DropdownMenuItem
            asChild
            className="cursor-pointer rounded-xl px-3 py-2.5 focus:bg-sky-50 focus:text-zinc-950 dark:focus:bg-sky-950/50 dark:focus:text-white"
          >
            <Link href="/dashboard">
              <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 text-sky-600 dark:bg-sky-950 dark:text-sky-400">
                <LayoutDashboard
                  className="h-4 w-4"
                  aria-hidden="true"
                />
              </span>

              <span className="flex flex-col">
                <span className="text-sm font-medium">
                  Dashboard
                </span>

                <span className="text-xs text-muted-foreground">
                  View your overview
                </span>
              </span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            asChild
            className="cursor-pointer rounded-xl px-3 py-2.5 focus:bg-yellow-50 focus:text-zinc-950 dark:focus:bg-yellow-950/40 dark:focus:text-white"
          >
            <Link href="/profile">
              <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-400">
                <User
                  className="h-4 w-4"
                  aria-hidden="true"
                />
              </span>

              <span className="flex flex-col">
                <span className="text-sm font-medium">
                  Profile
                </span>

                <span className="text-xs text-muted-foreground">
                  Manage personal details
                </span>
              </span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            asChild
            className="cursor-pointer rounded-xl px-3 py-2.5 focus:bg-zinc-100 focus:text-zinc-950 dark:focus:bg-zinc-800 dark:focus:text-white"
          >
            <Link href="/settings">
              <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                <Settings
                  className="h-4 w-4"
                  aria-hidden="true"
                />
              </span>

              <span className="flex flex-col">
                <span className="text-sm font-medium">
                  Settings
                </span>

                <span className="text-xs text-muted-foreground">
                  Update your preferences
                </span>
              </span>
            </Link>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator className="mx-2 bg-black/5 dark:bg-white/10" />

        {/* Logout */}
        <div className="p-1">
          <DropdownMenuItem
            asChild
            className="cursor-pointer rounded-xl px-3 py-2.5 text-red-600 focus:bg-red-50 focus:text-red-700 dark:text-red-400 dark:focus:bg-red-950/40 dark:focus:text-red-300"
          >
            <LogoutButton />
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

