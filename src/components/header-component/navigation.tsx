"use client";

import {
  BookOpen,
  House,
  LayoutDashboard,
  User as UserIcon, // Prisma User နဲ့ နာမည်မထပ်အောင် UserIcon လို့ ပြောင်းထားပါတယ်
  ShieldCheck, // Admin အတွက် Icon အသစ်
  LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { isActiveRoute } from "./animatedHeadline";
import { HeaderUser } from "../header";

type NavigationProps = {
  user: HeaderUser;
  pathname: string;
  mobile?: boolean;
  onNavigate?: () => void;
};

type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

// Base items (လူတိုင်းမြင်ရမယ့် Routes များ)
const BASE_NAVIGATION_ITEMS: readonly NavigationItem[] = [
  {
    label: "Interview-Portal",
    href: "/interview-portal",
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
    icon: UserIcon, 
  },
  {
    label: "Blog",
    href: "/blog",
    icon: House,
  },
];

export function Navigation({
  user,
  pathname,
  mobile = false,
  onNavigate,
}: NavigationProps) {
  
 
  const navItems = user?.role === "admin" 
    ? [...BASE_NAVIGATION_ITEMS, { label: "Admin", href: "/admin/dashboard", icon: ShieldCheck }]
    : BASE_NAVIGATION_ITEMS;

  return (
    <nav
      aria-label={mobile ? "Mobile navigation" : "Main navigation"}
      className={cn(
        mobile
          ? "flex flex-col gap-2"
          : "hidden items-center gap-1 rounded-xl border border-border/70 bg-muted/40 p-1.5 md:flex",
      )}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = isActiveRoute(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-2 text-sm font-medium outline-none transition-[background-color,color,box-shadow] duration-200 focus-visible:ring-2 focus-visible:ring-ring",
              mobile
                ? "rounded-xl border border-border/70 px-4 py-3"
                : "rounded-lg px-3 py-2",
              active
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:bg-background/80 hover:text-foreground",
            )}
          >
            <Icon className="size-4 shrink-0" aria-hidden="true" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}