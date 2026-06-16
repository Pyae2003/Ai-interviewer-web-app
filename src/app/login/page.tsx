import Header from "@/components/header";
import { dashboardPath, signUpPath } from "@/constants/route";
import LoginPage from "@/features/clients/auth/components/login-page";
import { getSession } from "@/lib/get-Session";
import { Plus } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";


const page = async () => {
  let session = null;

  try {
    session = await getSession();
  } catch (error) {
    console.error("Session error:", error);
  }

  if (session) {
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
};

export default page;
