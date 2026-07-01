import InterviewsResultPage from "@/features/clients/interviews/components/interviews-result-page";
import { getSession } from "@/lib/get-Session";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const session = await getSession();

  // AUTH GUARD
  if (!session?.user?.id) {
    redirect("/login");
  }

  const {id} = await params;
  // BASIC VALIDATION
  if (!id) {
    redirect("/dashboard");
  }

  return (
    <div>
      <InterviewsResultPage id={id} />
    </div>
  );
}