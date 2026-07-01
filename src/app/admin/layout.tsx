"use client";

import { Mic, Bell, Search } from "lucide-react";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { navDataArray } from "@/features/admin/dashboard/query/nav-data";

export default function AdminDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-50">
      {/* SIDEBAR */}
      <aside className="hidden w-72 border-r bg-white lg:flex lg:flex-col">
        <div className="border-b p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-yellow-300 shadow-md">
              <Mic className="h-6 w-6 text-black" />
            </div>

            <div>
              <h2 className="font-bold">AI Interview</h2>

              <p className="text-xs text-muted-foreground">Admin Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navDataArray.map((item) => {
              const Icon = item.icon;

              return (
                <Link href={item.path} key={item.label}>
                  <motion.button
                    whileHover={{
                      x: 5,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    key={item.label}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                      item.active
                        ? "bg-gradient-to-r from-sky-100 to-yellow-100 text-black"
                        : "hover:bg-zinc-100"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </motion.button>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="border-t p-4">
          <div className="flex items-center gap-3 rounded-xl bg-zinc-100 p-3">
            <Avatar>
              <AvatarFallback>PK</AvatarFallback>
            </Avatar>

            <div>
              <p className="text-sm font-medium">Admin</p>

              <p className="text-xs text-muted-foreground">admin@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* CONTENT */}

      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
