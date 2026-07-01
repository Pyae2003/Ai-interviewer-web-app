"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("App Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-white to-yellow-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-black/10 bg-white p-6 shadow-xl">
        {/* ICON */}
        <div className="flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">
            <AlertTriangle className="h-7 w-7 text-red-600" />
          </div>
        </div>

        {/* TITLE */}
        <h1 className="mt-5 text-center text-2xl font-bold text-zinc-900">
          Something went wrong
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-2 text-center text-sm text-zinc-500">
          We encountered an unexpected error. Please try again or return to dashboard.
        </p>

        {/* ERROR ID (optional production debug) */}
        {error?.digest && (
          <p className="mt-3 text-center text-xs text-zinc-400">
            Error ID: {error.digest}
          </p>
        )}

        {/* ACTIONS */}
        <div className="mt-6 flex flex-col gap-3">
          <Button
            onClick={() => reset()}
            className="w-full bg-gradient-to-r from-sky-500 to-yellow-400 text-black hover:opacity-90"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>

          <Link href="/dashboard">
            <Button variant="outline" className="w-full">
              <Home className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}