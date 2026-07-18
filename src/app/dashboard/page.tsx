import Header from "@/components/header";
import { loginPath } from "@/constants/route";
import MainDashboard from "@/features/clients/dashboard/components/main-dashboard";
import { getSession } from "@/lib/get-Session";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";
export default async function Page() {
  const session = await getSession();

  if (!session?.user?.id) {
    redirect(loginPath);
  }

  return (
    <>
      <Header
        path={loginPath}
        user={{
          id: session.user.id,
          name: session.user.name ?? "User",
          email: session.user.email ?? "",
          image: session.user.image ?? "",
        }}
      />{" "}
      <MainDashboard />
    </>
  );
}
