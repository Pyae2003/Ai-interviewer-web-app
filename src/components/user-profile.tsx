import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutButton } from "./logout";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { LayoutDashboard, User, Settings, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

type UserProfileProp = {
  id: string;
  name: string;
  email: string;
};
const UserProfile = ({ id, name, email }: UserProfileProp) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="hidden sm:flex items-center gap-2 rounded-xl"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-yellow-300 font-semibold text-black">
              {name?.charAt(0).toUpperCase() ?? "U"}
            </div>

            <div className="flex flex-col items-start">
              <span className="max-w-[120px] truncate text-sm font-medium">
                {name}
              </span>
            </div>

            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel>
            <div className="space-y-1">
              <p className="font-semibold">{name}</p>

              <p className="text-xs text-muted-foreground">{email}</p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="cursor-pointer">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/profile" className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/settings" className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <div>
              <LogOut className="mr-2 h-4 w-4" />
              <LogoutButton />
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserProfile;
