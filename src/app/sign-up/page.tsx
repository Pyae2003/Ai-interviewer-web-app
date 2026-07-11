import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { dashboardPath, loginPath } from "@/constants/route";
import SignUpPage from "@/features/clients/auth/components/signup-page";
import { getSession } from "@/lib/get-Session";
import { Plus } from "lucide-react";
import { redirect } from "next/navigation";
export const dynamic = 'force-dynamic';
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
          <Button className="bg-linear-to-r from-sky-500 to-yellow-400 text-black hover:opacity-90">
            <Plus className="mr-2 h-4 w-4" />
            Login
          </Button>
        }
      />

      <SignUpPage />
    </>
  );
}
