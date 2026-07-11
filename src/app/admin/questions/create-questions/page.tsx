import AdminHeader from "@/components/adminHeader";
import CreateQuestionPage from "@/features/admin/questions/components/create-questions-page";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { loginPath } from "@/constants/route";
export const dynamic = "force-dynamic";

const page = () => {
  return (
    <div className="w-full ">
      <AdminHeader
        path={loginPath}
        action={
          <Button className="bg-linear-to-r from-sky-500 to-yellow-400 text-black hover:opacity-90">
            <Plus className="mr-2 h-4 w-4" />
            Login
          </Button>
        }
      />
      <CreateQuestionPage />
    </div>
  );
};

export default page;
