import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { dashboardPath, loginPath } from "@/constants/route";
import SignUpPage from "@/features/clients/auth/components/signup-page";
import { getSession } from "@/lib/get-Session";
import { LogIn } from "lucide-react";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";
export default async function Page() {
  const session = await getSession();

  if (session?.user?.id) {
    redirect(dashboardPath);
  }

  return (
    <>
      <Header
        path={loginPath}
        action={
          <Button
            type="submit"
            className="h-11 rounded-xl bg-sky-600 px-5 font-semibold text-white shadow-sm transition-colors hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-500"
          >
            <LogIn className="mr-2 h-4 w-4" aria-hidden="true" />
            Login
          </Button>
        }
      />

      <SignUpPage />
    </>
  );
}
