"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "next-themes";
import {
  Menu,
  Sun,
  Moon,
  Bot,
  Sparkles,
  LayoutDashboard,
  Mic,
  BookOpen,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTitle,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import UserProfile from "./user-profile";

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

export default function Header({ user, path, action }: ClientHeaderProp) {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Interviews", href: "/interviews", icon: Mic },
    { label: "History", href: "/history", icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-black/10">
      {/* OUTER BOX */}
      <div className="mx-auto max-w-7xl px-4 py-3">
        {/* INNER BOX CONTAINER */}
        <div className="flex items-center justify-between rounded-2xl border border-black/10 bg-linear-to-r from-sky-100 via-white to-yellow-100 px-4 py-3 shadow-sm">
          {/* LEFT: BRAND BOX */}
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl bg-white px-3 py-2 shadow-sm border border-black/10"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-sky-400 to-yellow-300 text-black shadow-md">
              <Bot size={18} />
            </div>

            <div className="leading-tight">
              <p className="font-bold text-black">AI Interviewer</p>
              <p className="text-xs text-black/60">Smart Interview Platform</p>
            </div>
          </Link>

          {/* CENTER: NAV BOX (DESKTOP) */}
          <nav className="hidden md:flex items-center gap-2 rounded-xl border border-black/10 bg-white px-2 py-2 shadow-sm">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-black/70 hover:bg-sky-100 hover:text-black transition"
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: ACTION BOX */}
          <div className="flex items-center gap-2">
            {/* THEME TOGGLE BOX */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white shadow-sm hover:bg-yellow-100 transition"
            >
              {theme === "dark" ? (
                <Sun size={18} className="text-yellow-500" />
              ) : (
                <Moon size={18} className="text-sky-500" />
              )}
            </button>

            {/* CTA BUTTON */}
            {user ? (
              <UserProfile {...user} />
            ) : (
              <Link href={path} className="hidden sm:block">
                {action}
              </Link>
            )}

            {/* MOBILE MENU */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SheetTrigger asChild className="md:hidden">
                <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white shadow-sm">
                  <Menu />
                </button>
              </SheetTrigger>

              <SheetContent side="right" className="w-75 bg-white">
                {/* MOBILE HEADER BOX */}
                <div className="mb-6 rounded-xl border border-black/10 bg-linear-to-r from-sky-100 to-yellow-100 p-4">
                  <div className="flex items-center gap-2">
                    <Bot />
                    <span className="font-bold">AI Interviewer</span>
                  </div>
                  <p className="text-xs text-black/60 mt-1">
                    Prepare smarter. Interview better.
                  </p>
                </div>
                {user && (
                  <div className="mb-4 rounded-xl border bg-white p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-yellow-300 font-semibold text-black">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <p className="font-medium">{user.name}</p>

                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* MOBILE NAV BOX */}
                <div className="flex flex-col gap-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-medium hover:bg-sky-50 transition"
                      >
                        <Icon size={16} />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>

                {/* MOBILE CTA BOX */}
                <div className="mt-6 rounded-xl border border-black/10 bg-linear-to-r from-yellow-200 to-sky-200 p-4">
                  <Link href="/signup" onClick={() => setOpen(false)}>
                    <Button className="w-full bg-black text-white rounded-xl">
                      <Sparkles className="mr-2" size={16} />
                      Get Started
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
