import Header from "@/components/header";
import { loginPath } from "@/constants/route";
import EditPostFormPage from "@/features/clients/post-blog/components/edit-post-form-page";
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
    redirect("/blog");
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
      <EditPostFormPage id={id} />
    </div>
  );
}
