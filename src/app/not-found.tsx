"use client"
import Link from "next/link";
import { Home, SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { dashboardPath } from "@/constants/route";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-100 via-white to-yellow-100 px-4">
      <div className="mx-auto max-w-lg text-center">
        {/* Icon */}
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-yellow-400 shadow-xl">
          <SearchX className="h-14 w-14 text-black" />
        </div>

        {/* 404 */}
        <h1 className="mt-8 text-7xl font-extrabold tracking-tight text-zinc-900">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-4 text-2xl font-bold text-zinc-800">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-3 text-sm leading-6 text-zinc-500 sm:text-base">
          Sorry, we could not find the page you are looking for.
          The page may have been moved, deleted, or the URL may be incorrect.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            asChild
            className="bg-gradient-to-r from-sky-500 to-yellow-400 text-black hover:opacity-90"
          >
            <Link href={dashboardPath}>
              <Home className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>

          <Button
            variant="outline"
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </div>

        {/* Footer */}
        <p className="mt-10 text-xs text-zinc-400">
          AI Interviewer Platform • Error 404
        </p>
      </div>
    </main>
  );
}

