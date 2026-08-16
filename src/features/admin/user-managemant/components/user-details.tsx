"use client";

import { motion, useReducedMotion } from "framer-motion";
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
import { useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { formatLastLogin } from "@/lib/format-last-login";
import { adminUserManagemant } from "@/constants/route";

import { UserDetail } from "../type/user-type";
import { executeAdminAction } from "../type/userban-unban-type";
import { banUserByAdmin } from "../actions/user-banned";
import { unbanUserByAdmin } from "../actions/user-unbanned";

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
                  delay: index * 0.035,
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
      {/* HEADER */}
      <div>
        <AnimatedHeadline text="User Details" />

        <p className="text-muted-foreground">
          View and manage user account
        </p>
      </div>

      {/* PROFILE CARD */}
      <motion.div
        initial={{
          opacity: 0,
          y: 16,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
      >
        <Card className="overflow-hidden border shadow-sm">
          <div className="h-1 bg-sky-500" />

          <CardContent className="p-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="bg-zinc-100 text-3xl font-semibold text-zinc-800">
                  {name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <h2 className="truncate text-2xl font-bold text-zinc-900">
                  {name}
                </h2>

                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4 shrink-0" />

                    <span className="truncate">{email}</span>
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4 shrink-0" />

                    <span>Joined {formatLastLogin(joinedAt)}</span>
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4 shrink-0" />

                    <span>
                      Last login {formatLastLogin(lastLogin)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span
                  className={`rounded-full px-4 py-2 text-sm font-medium ${role === "admin"
                      ? "bg-sky-100 text-sky-700"
                      : "bg-zinc-100 text-zinc-700"
                    }`}
                >
                  {role?.toUpperCase()}
                </span>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-medium ${status === "ACTIVE"
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

      {/* STATS */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Interviews
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  {interviews}
                </h3>
              </div>

              <div className="rounded-xl bg-sky-100 p-3">
                <FileText className="h-6 w-6 text-sky-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Average Score
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  {avgScore}%
                </h3>
              </div>

              <div className="rounded-xl bg-amber-100 p-3">
                <Target className="h-6 w-6 text-amber-700" />
              </div>
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

              <div className="rounded-xl bg-green-100 p-3">
                <UserCheck className="h-6 w-6 text-green-700" />
              </div>
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

              <div className="rounded-xl bg-red-100 p-3">
                <Shield className="h-6 w-6 text-red-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* RECENT INTERVIEWS */}
      <Card>
        <CardContent className="p-6">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">
            Recent Interviews
          </h2>

          <div className="space-y-3">
            {recentInterviews.length === 0 ? (
              <div className="rounded-xl border p-4 text-sm text-muted-foreground">
                No recent interviews.
              </div>
            ) : (
              recentInterviews.map((item, index) => (
                <div
                  key={`${item.category}-${index}`}
                  className="flex items-center justify-between gap-4 rounded-xl border p-4 transition-colors hover:border-sky-200"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-zinc-900">
                      {item.category}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      Technical Interview
                    </p>
                  </div>

                  <div className="shrink-0 font-bold text-sky-600">
                    {item.score}%
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* ACCOUNT ACTIONS */}
      <Card>
        <CardContent className="p-6">
          <h2 className="mb-5 text-xl font-bold text-zinc-900">
            Account Actions
          </h2>

          <div className="flex flex-col gap-3 md:flex-row">
            {banned ? (
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={() => handleUnban(id)}
              >
                <ShieldCheck className="mr-2 h-4 w-4 text-green-600" />
                Unban User
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-50 hover:text-amber-800"
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