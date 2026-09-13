"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Search,
  Users,
  Shield,
  UserCheck,
  MoreHorizontal,
  Eye,
  Ban,
  Pencil,
  Trash,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { adminUserManagemant, userDetailPath } from "@/constants/route";
import { formatLastLogin } from "@/lib/format-last-login";

import { UserManagementPageProp } from "../type/user-type";
import { executeAdminAction } from "../type/userban-unban-type";
import { banUserByAdmin } from "../actions/user-banned";
import { unbanUserByAdmin } from "../actions/user-unbanned";
import React from "react";
import { userInfo } from "os";

type AnimatedHeadlineProps = {
  text: string;
};

function AnimatedHeadline({ text }: AnimatedHeadlineProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <h1
      aria-label={text}
      className="text-3xl font-bold tracking-tight text-zinc-900"
    >
      <span aria-hidden="true" className="inline-flex overflow-hidden py-1">
        {text.split("").map((character, index) => (
          <motion.span
            key={`${character}-${index}`}
            className="inline-block"
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 8,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={
              shouldReduceMotion
                ? {
                    duration: 0,
                  }
                : {
                    duration: 0.35,
                    delay: index * 0.025,
                    ease: [0.22, 1, 0.36, 1],
                  }
            }
          >
            {character === " " ? "\u00A0" : character}
          </motion.span>
        ))}
      </span>
    </h1>
  );
}

export default function UserManagementPage({
  usersStats,
  usersInfo = [],
}: UserManagementPageProp) {
  const router = useRouter();

  const handleBan = async (userId: string) => {
    await executeAdminAction(() => banUserByAdmin({ userId }), {
      loading: "Banning user...",
      success: "User banned successfully",
      error: "Failed to ban user",
    });

    router.push(adminUserManagemant);
  };

  const [search, setSearch] = React.useState("");

  const filteredUsers = React.useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return usersInfo;
    }

    return usersInfo.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role!.toLowerCase().includes(query) ||
        user.status.toLowerCase().includes(query),
    );
  }, [usersInfo, search]);

  const handleUnban = async (userId: string) => {
    await executeAdminAction(() => unbanUserByAdmin({ userId }), {
      loading: "Unbanning user...",
      success: "User unbanned successfully",
      error: "Failed to unban user",
    });

    router.push(adminUserManagemant);
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <AnimatedHeadline text="User Management" />

          <p className="text-muted-foreground">
            Manage platform users and admins
          </p>
        </div>

        {/* <Button>Create User</Button> */}
      </div>

      {/* STATS */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>

              <h2 className="text-3xl font-bold">
                {usersStats?.totalUsers || 0}
              </h2>
            </div>

            <div className="rounded-xl bg-sky-100 p-3">
              <Users className="h-6 w-6 text-sky-700" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">Active Users</p>

              <h2 className="text-3xl font-bold">
                {usersStats?.activeUsers || 0}
              </h2>
            </div>

            <div className="rounded-xl bg-green-100 p-3">
              <UserCheck className="h-6 w-6 text-green-700" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">Admins</p>

              <h2 className="text-3xl font-bold">{usersStats?.admins || 0}</h2>
            </div>

            <div className="rounded-xl bg-violet-100 p-3">
              <Shield className="h-6 w-6 text-violet-700" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">Banned Users</p>

              <h2 className="text-3xl font-bold">
                {usersStats?.bannedUsers || 0}
              </h2>
            </div>

            <div className="rounded-xl bg-red-100 p-3">
              <Ban className="h-6 w-6 text-red-700" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FILTER */}
      <Card>
        <CardContent className="p-5">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />{" "}
          </div>
        </CardContent>
      </Card>

      {/* USER TABLE */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="p-4 text-left">User</th>
                  <th className="p-4 text-left">Role</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Interviews</th>
                  <th className="p-4 text-left">Last Login</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{
                      opacity: 0,
                      y: 12,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.06,
                      ease: "easeOut",
                    }}
                    className="border-b transition-colors hover:bg-muted/30"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {user.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0">
                          <p className="truncate font-medium">{user.name}</p>

                          <p className="truncate text-sm text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          user.role === "admin"
                            ? "bg-sky-100 text-sky-700"
                            : "bg-zinc-100 text-zinc-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          user.status === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td className="p-4">{user.interviews}</td>

                    <td className="p-4">{formatLastLogin(user.joinedAt)}</td>

                    <td className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label={`Actions for ${user.name}`}
                          >
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={userDetailPath(user.id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </DropdownMenuItem>

                          {user.banned ? (
                            <DropdownMenuItem
                              onSelect={() => handleUnban(user.id)}
                              className="text-green-700 focus:text-green-700"
                            >
                              <ShieldCheck className="mr-2 h-4 w-4" />
                              Unban User
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onSelect={() => handleBan(user.id)}
                              className="text-amber-700 focus:text-amber-700"
                            >
                              <Ban className="mr-2 h-4 w-4" />
                              Ban User
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </motion.tr>
                ))}

                {filteredUsers.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-8 text-center text-sm text-muted-foreground"
                    >
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
