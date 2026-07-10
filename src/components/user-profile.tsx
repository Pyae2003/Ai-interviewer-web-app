"use client";

import Link from "next/link";
import {
  ChevronDown,
  LayoutDashboard,
  Settings,
  User,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { LogoutButton } from "./logout";

type UserProfileProps = {
  id: string;
  name: string;
  email: string;
};

export default function UserProfile({
  name,
  email,
}: UserProfileProps) {
  const initial = name?.charAt(0).toUpperCase() ?? "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="
            h-auto
            rounded-xl
            px-2
            py-1
            transition-all
            hover:bg-muted
          "
        >
          <div className="flex items-center gap-2">
            {/* Avatar */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-sky-500 to-yellow-400 font-semibold text-black shadow">
              {initial}
            </div>

            {/* Desktop */}
            <div className="hidden sm:flex flex-col items-start">
              <span className="max-w-35 truncate text-sm font-semibold">
                {name}
              </span>

              <span className="max-w-40] truncate text-xs text-muted-foreground">
                {email}
              </span>
            </div>

            {/* Desktop Arrow */}
            <ChevronDown className="hidden h-4 w-4 text-muted-foreground sm:block" />
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-64 rounded-xl"
      >
        {/* Header */}
        <DropdownMenuLabel className="pb-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-sky-500 to-yellow-400 font-bold text-black">
              {initial}
            </div>

            <div className="overflow-hidden">
              <p className="truncate font-semibold">
                {name}
              </p>

              <p className="truncate text-xs text-muted-foreground">
                {email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link
            href="/dashboard"
            className="flex cursor-pointer items-center"
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/profile"
            className="flex cursor-pointer items-center"
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/settings"
            className="flex cursor-pointer items-center"
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem asChild>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}