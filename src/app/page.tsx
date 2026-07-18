import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { loginPath } from "@/constants/route";
import WelcomeProfilePage from "@/features/clients/dashboard/components/first-UI-Page";
import { getSession } from "@/lib/get-Session";
import { Plus } from "lucide-react";
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
            <Button className="bg-linear-to-r from-sky-500 to-yellow-400 text-black hover:opacity-90">
              <Plus className="mr-2 h-4 w-4" />
              Get Started
            </Button>
          ) : null
        }
      />

      {/* MAIN CONTENT */}
      <main>
        <WelcomeProfilePage />
      </main>
    </div>
  );
}
