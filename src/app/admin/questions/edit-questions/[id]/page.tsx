import AdminHeader from "@/components/adminHeader";
import { Button } from "@/components/ui/button";
import { loginPath } from "@/constants/route";
import UpdateQuestionPage from "@/features/admin/questions/components/update-question-page";
import { Plus } from "lucide-react";
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
          <Button className="bg-gradient-to-r from-sky-500 to-yellow-400 text-black hover:opacity-90">
            <Plus className="mr-2 h-4 w-4" />
            Login
          </Button>
        }
      />
      <UpdateQuestionPage id={id} />
    </div>
  );
};

export default page;
