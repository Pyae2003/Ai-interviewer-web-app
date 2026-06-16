import AdminHeader from "@/components/adminHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { createQuestionPath } from "@/constants/route";
const page = () => {
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
    </div>
  )
}

export default page