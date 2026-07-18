  "use client";

import Link from "next/link";
import { useState } from "react";
import { motion, MotionConfig, type Variants } from "framer-motion";
import {
  Menu,
  Bot,
  Sparkles,
  LayoutDashboard,
  BookOpen,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import UserProfile from "./user-profile";
import { LogoutButton } from "./logout";
import { ThemeToggle } from "./theme-toggle";

export interface ClientHeaderProp {
  path: string;
  partName?: string;
  action?: React.ReactNode;
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

interface AnimatedHeadlineProps {
  text: string;
  className?: string;
}

const headlineContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.07,
    },
  },
};

const headlineWordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 6,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function AnimatedHeadline({
  text,
  className = "",
}: AnimatedHeadlineProps) {
  const words = text.split(" ");

  return (
    <MotionConfig reducedMotion="user">
      <motion.p
        initial="hidden"
        animate="visible"
        variants={headlineContainerVariants}
        aria-label={text}
        className={className}
      >
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            aria-hidden="true"
            variants={headlineWordVariants}
            className={
              index === words.length - 1
                ? "inline-block bg-linear-to-r from-sky-500 to-yellow-500 bg-clip-text text-transparent"
                : "mr-[0.25em] inline-block"
            }
          >
            {word}
          </motion.span>
        ))}
      </motion.p>
    </MotionConfig>
  );
}

export default function Header({
  user,
  path,
  action,
}: ClientHeaderProp) {
  const [open, setOpen] = useState(false);

  const navItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "History",
      href: "/history",
      icon: BookOpen,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: User,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/75 backdrop-blur-xl  bg-linear-to-br from-sky-50 via-white to-yellow-50 dark:from-sky-950 dark:via-zinc-950 dark:to-yellow-950">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center justify-between rounded-2xl border border-black/5 bg-linear-to-r from-sky-50 via-white to-yellow-50 px-4 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.05)] dark:border-white/10 dark:from-sky-950/70 dark:via-zinc-950 dark:to-yellow-950/70">
          {/* Brand */}
          <Link
            href="/"
            aria-label="AI Interviewer home"
            className="group flex items-center gap-3 rounded-xl border border-black/5 bg-white/90 px-3 py-2 shadow-sm transition-colors duration-200 hover:bg-white dark:border-white/10 dark:bg-zinc-900/90 dark:hover:bg-zinc-900"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-sky-400 to-yellow-300 text-zinc-900 shadow-sm">
              <Bot size={18} aria-hidden="true" />
            </div>

            <div className="min-w-0 leading-tight">
              <AnimatedHeadline
                text="AI Interviewer"
                className="whitespace-nowrap text-sm font-bold tracking-tight text-zinc-900 sm:text-base dark:text-white"
              />

              <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                Smart Interview Platform
              </p>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 rounded-xl border border-black/5 bg-white/90 p-1.5 shadow-sm md:flex dark:border-white/10 dark:bg-zinc-900/90"
          >
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-colors duration-200 hover:bg-sky-50 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-white"
                >
                  <Icon size={16} aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            {user ? (
              <div className="hidden sm:block">
                <UserProfile {...user} />
              </div>
            ) : (
              <Link href={path} className="hidden sm:block">
                {action}
              </Link>
            )}

            {/* Mobile menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Open navigation menu"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/5 bg-white shadow-sm transition-colors duration-200 hover:bg-zinc-50 md:hidden dark:border-white/10 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                >
                  <Menu size={19} aria-hidden="true" />
                </button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-75 border-l border-black/5 bg-white p-5 dark:border-white/10 dark:bg-zinc-950"
              >
                <SheetTitle className="sr-only">
                  Navigation Menu
                </SheetTitle>

                {/* Mobile brand */}
                <div className="mb-6 rounded-2xl border border-black/5 bg-linear-to-r from-sky-50 to-yellow-50 p-4 dark:border-white/10 dark:from-sky-950/70 dark:to-yellow-950/70">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-sky-400 to-yellow-300 text-zinc-900">
                      <Bot size={18} aria-hidden="true" />
                    </div>

                    <div>
                      <AnimatedHeadline
                        text="AI Interviewer"
                        className="font-bold tracking-tight text-zinc-900 dark:text-white"
                      />

                      <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                        Prepare smarter. Interview better.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mobile user */}
                {user && (
                  <div className="mb-4 rounded-2xl border border-black/5 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-zinc-900">
                    <div className="flex items-center gap-3">
                      <UserProfile {...user} />

                      <div className="min-w-0">
                        <p className="truncate font-medium text-zinc-900 dark:text-white">
                          {user.name}
                        </p>

                        <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile navigation */}
                <nav
                  aria-label="Mobile navigation"
                  className="flex flex-col gap-2"
                >
                  {navItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-xl border border-black/5 bg-white px-4 py-3 text-sm font-medium text-zinc-700 transition-colors duration-200 hover:bg-sky-50 hover:text-zinc-950 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-white"
                      >
                        <Icon size={16} aria-hidden="true" />
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>

                {/* Mobile action */}
                <div className="mt-6 rounded-2xl border border-black/5 bg-linear-to-r from-yellow-100 to-sky-100 p-4 dark:border-white/10 dark:from-yellow-950/70 dark:to-sky-950/70">
                  {!user ? (
                    <Button
                      asChild
                      className="w-full rounded-xl bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                    >
                      <Link
                        href="/signup"
                        onClick={() => setOpen(false)}
                      >
                        <Sparkles
                          className="mr-2"
                          size={16}
                          aria-hidden="true"
                        />
                        Get Started
                      </Link>
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2 text-sm">
                      <Sparkles size={16} aria-hidden="true" />
                      <LogoutButton />
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
