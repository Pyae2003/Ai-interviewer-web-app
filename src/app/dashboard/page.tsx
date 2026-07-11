import Header from "@/components/header";
import { loginPath } from "@/constants/route";
import MainDashboard from "@/features/clients/dashboard/components/main-dashboard";
import { getSession } from "@/lib/get-Session";
import { redirect } from "next/navigation";
export const dynamic = 'force-dynamic';
export default async function Page() {
  const session = await getSession();

  // AUTH GUARD
  if (!session?.user?.id) {
    redirect(loginPath);
  }

  const userObject = {
    id: session.user.id,
    name: session.user.name ?? "User",
    email: session.user.email ?? "",
  };

  return (
    <>
      <Header path={loginPath} user={userObject} />
      <MainDashboard />
    </>
  );
}
