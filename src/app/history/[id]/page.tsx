import Header from "@/components/header";
import { loginPath } from "@/constants/route";
import HistroyDetailPage from "@/features/clients/history/components/history-details-page";
import { getSession } from "@/lib/get-Session";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const session = await getSession();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const { id } = await params;

  if (!id) {
    redirect("/history");
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
      <HistroyDetailPage interviewId={id} />
    </div>
  );
}
