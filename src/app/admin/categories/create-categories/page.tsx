import AdminHeader from "@/components/adminHeader";
import { loginPath } from "@/constants/route";
import CreateCategoriesPage from "@/features/admin/category/components/create-categories-page";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
export const dynamic = 'force-dynamic';
const page = () => {
  return (
    <div>
      <AdminHeader
        path={loginPath}
        action={
          <Button className="bg-linear-to-r from-sky-500 to-yellow-400 text-black hover:opacity-90">
            <Plus className="mr-2 h-4 w-4" />
            Login
          </Button>
        }
      />
      <CreateCategoriesPage />
    </div>
  );
};

export default page;
