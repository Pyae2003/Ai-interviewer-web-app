import { InterviewHistory } from "@/features/clients/history/components/interview-history";
import { getSession } from "@/lib/get-Session";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();

  // AUTH GUARD
  if (!session?.user?.id) {
    redirect("/login");
  }

  return (
    <div>
      <InterviewHistory />
    </div>
  );
}