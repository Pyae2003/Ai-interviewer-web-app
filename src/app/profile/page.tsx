import { redirect } from "next/navigation";

import UserProfilePage from "@/features/clients/profile/components/user-profile-page";
import { getSession } from "@/lib/get-Session";
import { loginPath } from "@/constants/route";
import Header from "@/components/header";
export const dynamic = "force-dynamic";
export default async function Page() {
  const session = await getSession();

  if (!session?.user?.id) {
    redirect(loginPath);
  }

  return (
    <div>
      <Header
        path={loginPath}
        user={{
          id: session.user.id,
          name: session.user.name ?? "User",
          email: session.user.email ?? "",
          image: session.user.image ?? "",
        }}
      />
      <UserProfilePage />
    </div>
  );
}
