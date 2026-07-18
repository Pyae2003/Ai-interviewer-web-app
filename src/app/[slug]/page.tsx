import { redirect, notFound } from "next/navigation";

import Header from "@/components/header";

import { dashboardPath, loginPath } from "@/constants/route";

import CategoryListPage from "@/features/clients/dashboard/components/category-list-page";

import { getSession } from "@/lib/get-Session";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  // Authenticate user
  const session = await getSession();

  if (!session?.user?.id) {
    redirect(loginPath);
  }

  const { slug } = await params;

  console.log("this is the slug name ", slug);

  if (!slug) {
    redirect(dashboardPath);
  }

  if (slug.trim().length === 0) {
    notFound();
  }

  return (
    <>
      <Header
        path={loginPath}
        user={{
          id: session.user.id,
          name: session.user.name ?? "User",
          email: session.user.email ?? "",
          image: session.user.image ?? "",
        }}
      />

      <main className="min-h-screen bg-background">
        <CategoryListPage slug={slug} />
      </main>
    </>
  );
}
