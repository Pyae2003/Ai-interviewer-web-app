"use client";

import { motion } from "framer-motion";

import {
  Mail,
  Calendar,
  Shield,
  UserCheck,
  Clock,
  Target,
  FileText,
  Ban,
  Trash2,
  ShieldCheck,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { UserDetail } from "../type/user-type";
import { formatLastLogin } from "@/lib/format-last-login";
import { executeAdminAction } from "../type/userban-unban-type";
import { banUserByAdmin } from "../actions/user-banned";
import { unbanUserByAdmin } from "../actions/user-unbanned";
import { useRouter } from "next/navigation";
import { adminUserManagemant } from "@/constants/route";

export default function UserDetails({
  id,
  name,
  email,
  role,
  status,
  joinedAt,
  banned,
  lastLogin,
  interviews,
  avgScore,
  passed,
  failed,
  recentInterviews,
}: UserDetail) {
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
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">User Details</h1>

        <p className="text-muted-foreground">View and manage user account</p>
      </div>
      {/* Profile Card */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <Card className="overflow-hidden border-0 shadow-xl">
          <div className="h-2 bg-linear-to-r from-sky-400 to-yellow-300" />

          <CardContent className="p-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-3xl">
                  {name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h2 className="text-2xl font-bold">{name}</h2>

                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {email}
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Joined {formatLastLogin(joinedAt)}
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Last Login {formatLastLogin(lastLogin)}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span
                  className={`rounded-full px-4 py-2 text-sm font-medium ${
                    role === "admin" ? "bg-sky-100 text-sky-700" : "bg-zinc-100"
                  }`}
                >
                  {role?.toUpperCase()}
                </span>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-medium ${
                    status === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {status}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      {/* Stats */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Interviews</p>

                <h3 className="mt-2 text-3xl font-bold">{interviews}</h3>
              </div>

              <FileText />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Score</p>

                <h3 className="mt-2 text-3xl font-bold">{avgScore}%</h3>
              </div>

              <Target />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Passed</p>

                <h3 className="mt-2 text-3xl font-bold text-green-600">
                  {passed}
                </h3>
              </div>

              <UserCheck />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Failed</p>

                <h3 className="mt-2 text-3xl font-bold text-red-600">
                  {failed}
                </h3>
              </div>

              <Shield />
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Recent Interviews */}
      <Card>
        <CardContent className="p-6">
          <h2 className="mb-4 text-xl font-bold">Recent Interviews</h2>

          <div className="space-y-3">
            {recentInterviews.map((item) => (
              <div
                key={item.category}
                className="flex items-center justify-between rounded-xl border p-4"
              >
                <div>
                  <p className="font-medium">{item.category}</p>

                  <p className="text-sm text-muted-foreground">
                    Technical Interview
                  </p>
                </div>

                <div className="font-bold text-sky-600">{item.score}%</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      {/* Actions */}
      <Card>
        <CardContent className="p-6">
          <h2 className="mb-5 text-xl font-bold">Account Actions</h2>

          <div className="flex flex-col gap-3 md:flex-row">
            {banned ? (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleUnban(id)}
              >
                <ShieldCheck className="mr-2 h-4 w-4 text-green-600" />
                Unban User
              </Button>
            ) : (
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleBan(id)}
              >
                <Ban className="mr-2 h-4 w-4" />
                Ban User
              </Button>
            )}

            <Button variant="destructive" className="flex-1">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete User
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
