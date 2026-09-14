"use client";
import { Menu, Sparkles } from "lucide-react";
import Link from "next/link";
import { ReactNode, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HeaderUser } from "../header";
import { Brand } from "./brand";
import UserProfile from "../user-profile";
import { Navigation } from "./navigation";
import { LogoutButton } from "../logout";

type MobileMenuProps = {
  user?: HeaderUser;
  path: string;
  actionContent: ReactNode;
  pathname: string;
};

export function MobileMenu({
  user,
  path,
  actionContent,
  pathname,
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open navigation menu"
          className="flex size-10 items-center justify-center rounded-xl border border-border bg-background text-foreground shadow-sm outline-none transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring md:hidden"
        >
          <Menu className="size-5" aria-hidden="true" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[min(88vw,20rem)] border-l border-border bg-background p-5"
      >
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>

        <div className="mb-6 rounded-2xl border border-border/70 bg-muted/40 p-3">
          <Brand onNavigate={closeMenu} />
        </div>

        {user && (
          <div className="mb-4 rounded-2xl border border-border/70 bg-card p-4 shadow-sm">
            <div className="flex min-w-0 items-center gap-3">
              <UserProfile {...user} />

              <div className="min-w-0">
                <p className="truncate font-medium text-foreground">
                  {user.name.trim() || "User"}
                </p>

                <p className="truncate text-xs text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        )}

        <Navigation pathname={pathname} user={user!} mobile onNavigate={closeMenu} />

        <div className="mt-6 rounded-2xl border border-border/70 bg-muted/40 p-4">
          {!user ? (
            <Link href={path} onClick={closeMenu}>
              {actionContent}
            </Link>
          ) : (
            <div className="flex items-center justify-between gap-3 text-sm text-foreground">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-sky-500" aria-hidden="true" />
                <span className="font-medium">Account</span>
              </div>

              <LogoutButton />
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
