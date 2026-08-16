import AdminHeader from "@/components/adminHeader";
import { Button } from "@/components/ui/button";
import { loginPath } from "@/constants/route";
import UpdateQuestionPage from "@/features/admin/questions/components/update-question-page";
import { LogIn, Plus } from "lucide-react";
export const dynamic = "force-dynamic";

type Prop = {
  params: Promise<{ id: string }>;
};
const page = async ({ params }: Prop) => {
  const { id } = await params;
  return (
    <div>
      <AdminHeader
        path={loginPath}
        action={
          <Button
            type="submit"
            className="h-11 rounded-xl bg-sky-600 px-5 font-semibold text-white shadow-sm transition-colors hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-500"
          >
            <LogIn className="mr-2 h-4 w-4" aria-hidden="true" />
            Login
          </Button>
        }
      />
      <UpdateQuestionPage id={id} />
    </div>
  );
};

export default page;
