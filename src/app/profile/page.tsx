import { redirect } from "next/navigation";

import UserProfilePage from "@/features/clients/profile/components/user-profile-page";
import { getSession } from "@/lib/get-Session";
import { loginPath } from "@/constants/route";

export default async function Page() {
  const session = await getSession();

  if (!session?.user?.id) {
    redirect(loginPath);
  }

  return <UserProfilePage />;
}