"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { signOutUser } from "@/features/clients/auth/actions/logout";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const handleLogout = () => {
    startTransition(async () => {
      const result = await signOutUser();

      if (result.success) {
        router.replace("/login");
        router.refresh();
      }
    });
  };

  return (
    <button onClick={handleLogout} disabled={pending}>
      <LogOut className="mr-2 h-4 w-4" />

      {pending ? "Logging out..." : "Logout"}
    </button>
  );
}
