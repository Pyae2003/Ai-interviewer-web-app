import Link from "next/link";
import {
  BookOpen,
  LayoutDashboard,
  RotateCcw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function ResultActions() {
  return (
    <Card className="rounded-3xl border border-border/70 bg-card p-4 shadow-sm">
      <nav
        aria-label="Interview result actions"
        className="grid gap-3 md:grid-cols-3"
      >
        <Button
          asChild
          size="lg"
          className="h-12 rounded-xl bg-sky-600 font-semibold text-white shadow-sm transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-sky-700 hover:shadow-md dark:bg-sky-500 dark:hover:bg-sky-600"
        >
          <Link href="/dashboard">
            <LayoutDashboard
              className="mr-2 size-4"
              aria-hidden="true"
            />
            Dashboard
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          size="lg"
          className="h-12 rounded-xl border-border bg-background font-semibold transition-colors hover:bg-muted"
        >
          <Link href="/history">
            <BookOpen className="mr-2 size-4" aria-hidden="true" />
            View History
          </Link>
        </Button>
      </nav>
    </Card>
  );
}
