import Header from "@/components/header";
import { dashboardPath, signUpPath } from "@/constants/route";
import LoginPage from "@/features/clients/auth/components/login-page";
import { getSession } from "@/lib/get-Session";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {  UserPlus } from "lucide-react";
export const dynamic = 'force-dynamic';
export default async function Page() {
  const session = await getSession();

  // AUTH GUARD
  if (session?.user?.id) {
    redirect(dashboardPath);
  }

  return (
    <div>
      <Header
        path={signUpPath}
        action={
          <Button
            type="submit"
            className="h-11 rounded-xl bg-sky-600 px-5 font-semibold text-white shadow-sm transition-colors hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-500"
          >
            <UserPlus className="mr-2 h-4 w-4" aria-hidden="true" />
            Sign Up
          </Button>
        }
      />

      <LoginPage />
    </div>
  );
}