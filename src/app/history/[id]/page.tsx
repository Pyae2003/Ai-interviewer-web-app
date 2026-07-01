import HistroyDetailPage from "@/features/clients/history/components/history-details-page";
import { getSession } from "@/lib/get-Session";
import { redirect } from "next/navigation";

type Props = {
  params: Promise< {
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const session = await getSession();

  // AUTH GUARD
  if (!session?.user?.id) {
    redirect("/login");
  };

  const { id } = await params;

  // BASIC VALIDATION
  if (!id) {
    redirect("/history");
  }

  return (
    <div>
      <HistroyDetailPage interviewId={id} />
    </div>
  );
}