import Header from "@/components/header";
import { dashboardPath, signUpPath } from "@/constants/route";
import LoginPage from "@/features/clients/auth/components/login-page";
import { getSession } from "@/lib/get-Session";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
          <Button className="bg-gradient-to-r from-sky-500 to-yellow-400 text-black hover:opacity-90">
            <Plus className="mr-2 h-4 w-4" />
            Sign Up
          </Button>
        }
      />

      <LoginPage />
    </div>
  );
}