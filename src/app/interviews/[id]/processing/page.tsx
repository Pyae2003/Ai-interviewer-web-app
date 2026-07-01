import ProcessingPage from "@/features/clients/interviews/components/processing-page";
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
      <ProcessingPage interviewId={id} />
    </div>
  );
}