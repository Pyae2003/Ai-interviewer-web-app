"use client";

import { motion } from "framer-motion";

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

import { Card, CardContent } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { UserManagementPageProp } from "../type/user-type";
import { formatLastLogin } from "@/lib/format-last-login";
import Link from "next/link";
import { adminUserManagemant, userDetailPath } from "@/constants/route";
import { banUserByAdmin } from "../actions/user-banned";
import { unbanUserByAdmin } from "../actions/user-unbanned";
import { executeAdminAction } from "../type/userban-unban-type";
import { useRouter } from "next/navigation";

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
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>

          <p className="text-muted-foreground">
            Manage platform users and admins
          </p>
        </div>

        <Button>Create User</Button>
      </div>

      {/* STATS */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground"> Total Users </p>

              <h2 className="text-3xl font-bold">
                {usersStats?.totalUsers || 0}
              </h2>
            </div>

            <Users />
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

            <UserCheck />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">Admins</p>

              <h2 className="text-3xl font-bold">{usersStats?.admins || 0}</h2>
            </div>

            <Shield />
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

            <Ban />
          </CardContent>
        </Card>
      </div>

      {/* FILTER */}

      <Card>
        <CardContent className="p-5">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

            <Input placeholder="Search users..." className="pl-9" />
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
                {usersInfo.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: index * 0.1,
                    }}
                    className="border-b hover:bg-muted/30"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>

                        <div>
                          <p className="font-medium">{user.name}</p>

                          <p className="text-sm text-muted-foreground">
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
                            : "bg-zinc-100"
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

                    <td className="p-4"> {formatLastLogin(user.lastLogin)}</td>

                    <td className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={userDetailPath(user.id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>

                          <DropdownMenuItem>
                            {user.banned ? (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUnban(user.id)}
                              >
                                <ShieldCheck className="mr-2 h-4 w-4 text-green-600" />
                                Unban User
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleBan(user.id)}
                              >
                                <Ban className="mr-2 h-4 w-4" />
                                Ban User
                              </Button>
                            )}
                          </DropdownMenuItem>

                          <DropdownMenuItem className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
