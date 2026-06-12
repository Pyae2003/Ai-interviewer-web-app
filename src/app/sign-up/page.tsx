import HeaderWrapper from "@/components/headerWrapper";
import { dashboardPath } from "@/constants/route";
import SignUpPage from "@/features/clients/auth/components/signup-page";
import { getSession } from "@/lib/get-Session";
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
      <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <HeaderWrapper />
        <SignUpPage />
      </div>
    </div>
  );
};

export default page;
