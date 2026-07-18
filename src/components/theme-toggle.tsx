"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={toggleTheme}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white shadow-sm transition-colors duration-200 hover:bg-yellow-100 dark:border-white/10 dark:bg-zinc-900 dark:hover:bg-zinc-800"
    >
      <Moon
        size={18}
        aria-hidden="true"
        className="block text-sky-500 dark:hidden"
      />

      <Sun
        size={18}
        aria-hidden="true"
        className="hidden text-yellow-500 dark:block"
      />
    </button>
  );
}