import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { loginPath } from "@/constants/route";
import WelcomeProfilePage from "@/features/clients/dashboard/components/welcome-page";
import { getSession } from "@/lib/get-Session";
import { ArrowRight } from "lucide-react";
export const dynamic = "force-dynamic";
export default async function Home() {
  const session = await getSession();

  const user = session?.user
    ? {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image || undefined,
      }
    : null;

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <Header
        user={user ?? undefined}
        path={loginPath}
       action={
  !user ? (
    <Button className="h-11 rounded-xl bg-sky-600 px-5 font-semibold text-white shadow-sm transition-colors hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-500">
      Get Started
      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
    </Button>
  ) : null
}
      />

      <main>
        <WelcomeProfilePage />
      </main>
    </div>
  );
}
