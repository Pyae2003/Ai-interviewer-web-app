import Header from "@/components/header";
import InterviewAnsweringPage from "@/features/clients/interviews/components/interviews-answerting-page";
import { loginPath } from "@/constants/route";
import { getSession } from "@/lib/get-Session";
import { redirect } from "next/navigation";


type Props = {
  params: Promise<{
    id: string;
  }>
};

export default async function Page({ params }: Props) {
  const session = await getSession();

  if (!session?.user?.id) {
    redirect(loginPath);
  };

  const { id } = await params;
  if (!id) {
    redirect("/dashboard");
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

      <InterviewAnsweringPage interviewId={id} />
    </div>
  );
}