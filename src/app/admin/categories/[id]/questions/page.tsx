import AdminHeader from "@/components/adminHeader";
import { Button } from "@/components/ui/button";
import { createQuestionPath } from "@/constants/route";
import QuestionsDashboard from "@/features/admin/questions/components/questions-dashboard";
import { Plus } from "lucide-react";

type Prop = {
  params: Promise<{ id: string }>;
};
const page = async ({ params }: Prop) => {
  const { id } = await params;
  return (
    <div>
      <AdminHeader
        path={createQuestionPath}
        action={
          <Button className="bg-gradient-to-r from-sky-500 to-yellow-400 text-black hover:opacity-90">
            <Plus className="mr-2 h-4 w-4" />
            Add Questions
          </Button>
        }
      />
      <QuestionsDashboard categoryId={id} />
    </div>
  );
};

export default page;
