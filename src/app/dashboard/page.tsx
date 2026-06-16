import Header from "@/components/header";
import { loginPath } from "@/constants/route";
import MainDashboard from "@/features/clients/dashboard/components/main-dashboard";
import { getSession } from "@/lib/get-Session";
import { redirect } from "next/navigation";
// import { loginPath } from "@/constants/route";
// import { getSession } from "@/lib/get-Session";
// import { redirect } from "next/navigation";

const page = async () => {
  let session = null;

  try {
    session = await getSession();
  } catch (error) {
    console.error("Session error:", error);
  }

  if (!session) {
    redirect(loginPath);
  }

  const userId = session.user.id;

  if (!userId) {
    redirect(loginPath);
  }
  const userObject = {
    id : userId,
    name : session.user.name,
    email : session.user.email
  }
  return (
    <div>
       <Header
          path={loginPath}
          user={userObject}
        />
      <MainDashboard />
    </div>
  );
};

export default page;
