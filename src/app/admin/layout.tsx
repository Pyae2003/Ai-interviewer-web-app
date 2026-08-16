"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Mic } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { navDataArray } from "@/features/admin/dashboard/query/nav-data";
import { LogoutButton } from "@/components/logout";

type AdminDashboardProps = {
  children: ReactNode;
  admin?: {
    name?: string | null;
    email?: string | null;
  };
};

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

export default function AdminDashboard({
  children,
  admin,
}: AdminDashboardProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const adminName = admin?.name || "Administrator";
  const adminEmail = admin?.email || "pyaekhant20sh32te47@gmail.com";

  const isActivePath = (path: string) => {
    if (path === "/admin/dashboard") {
      return pathname === path;
    }

    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <div className="flex min-h-screen bg-zinc-50/70 dark:bg-zinc-950">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r bg-white dark:bg-zinc-950 lg:flex">
        <div className="flex h-20 items-center border-b px-5">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
              <Mic className="h-5 w-5" />
            </div>

            <div className="leading-tight">
              <h2 className="font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                AI Interview
              </h2>

              <p className="text-xs text-muted-foreground">
                Admin Console
              </p>
            </div>
          </Link>
        </div>
        <nav
          aria-label="Admin sidebar navigation"
          className="flex-1 overflow-y-auto px-3 py-5"
        >
          <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Management
          </p>

          <div className="space-y-1">
            {navDataArray.map((item) => {
              const Icon = item.icon;
              const isActive = isActivePath(item.path);

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative flex h-11 items-center gap-3 overflow-hidden rounded-xl px-3 text-sm font-medium transition-colors ${isActive
                      ? "text-sky-700 dark:text-sky-300"
                      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                    }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="admin-sidebar-active"
                      className="absolute inset-0 rounded-xl bg-sky-50 dark:bg-sky-950/70"
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : {
                            duration: 0.2,
                            ease: "easeOut",
                          }
                      }
                    />
                  )}

                  <span
                    className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-lg ${isActive
                        ? "bg-sky-100 dark:bg-sky-900"
                        : "bg-transparent"
                      }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>

                  <span className="relative z-10 truncate">
                    {item.label}
                  </span>

                  {isActive && (
                    <span className="absolute right-3 z-10 h-1.5 w-1.5 rounded-full bg-sky-600 dark:bg-sky-300" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* ADMIN PROFILE */}
        {/* ADMIN PROFILE */}
        <div className="border-t p-4">
          <div className="flex items-center gap-3 rounded-xl border bg-zinc-50 p-3 dark:bg-zinc-900">
            <div className="relative shrink-0">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-sky-100 text-sm font-semibold text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                  {getInitials(adminName)}
                </AvatarFallback>
              </Avatar>

              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500 dark:border-zinc-900" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {adminName}
              </p>

              <p className="truncate text-xs text-muted-foreground">
                {adminEmail}
              </p>
            </div>
          </div>

          <div className="mt-3">
            <LogoutButton />
          </div>
        </div>
      </aside>

      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}