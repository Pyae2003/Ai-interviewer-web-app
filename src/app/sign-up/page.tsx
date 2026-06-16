import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { dashboardPath, loginPath } from "@/constants/route";
import SignUpPage from "@/features/clients/auth/components/signup-page";
import { getSession } from "@/lib/get-Session";
import { Plus } from "lucide-react";
import { redirect } from "next/navigation";

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
      <div>
        <Header
          path={loginPath}
          action={
            <Button className="bg-gradient-to-r from-sky-500 to-yellow-400 text-black hover:opacity-90">
              <Plus className="mr-2 h-4 w-4" />
              Login
            </Button>
          }
        />
        <SignUpPage />
      </div>
    </div>
  );
};

export default page;
