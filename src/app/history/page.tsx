import Header from "@/components/header";
import { loginPath } from "@/constants/route";
import { InterviewHistory } from "@/features/clients/history/components/interview-history";
import { getSession } from "@/lib/get-Session";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();

  // AUTH GUARD
  if (!session?.user?.id) {
    redirect("/login");
  }
  const userObject = {
    id: session.user.id,
    name: session.user.name ?? "User",
    email: session.user.email ?? "",
  };

  return (
    <div>
      <Header path={loginPath} user={userObject} />
      <InterviewHistory />
    </div>
  );
}
