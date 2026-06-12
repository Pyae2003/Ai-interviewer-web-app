"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { signOutUser } from "@/features/clients/auth/actions/logout";

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
    <button
      onClick={handleLogout}
      disabled={pending}
    >
      {pending ? "Logging out..." : "Logout"}
    </button>
  );
}