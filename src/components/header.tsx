"use client";

import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

import { ThemeToggle } from "./theme-toggle";
import { Brand } from "./header-component/brand";
import { Navigation } from "./header-component/navigation";
import { MobileMenu } from "./header-component/mobile-menu";
import { DesktopAccountAction } from "./header-component/desktop-account-action";

export type HeaderUser = {
  id: string;
  email: string;
  name: string;
  image?: string;
};

export interface ClientHeaderProp {
  path: string;
  partName?: string;
  action?: ReactNode;
  user?: HeaderUser;
}


export default function Header({
  user,
  path,
  partName,
  action,
}: ClientHeaderProp) {
  const pathname = usePathname();
  const actionContent = action ?? partName ?? "Get Started";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/90 backdrop-blur-xl supports-backdrop-filter:bg-background/75">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <Brand />

        <Navigation pathname={pathname} />

        <div className="flex items-center justify-self-end gap-2">
          <ThemeToggle />

          <DesktopAccountAction
            user={user}
            path={path}
            actionContent={actionContent}
          />

          <MobileMenu
            user={user}
            path={path}
            actionContent={actionContent}
            pathname={pathname}
          />
        </div>
      </div>
    </header>
  );
}