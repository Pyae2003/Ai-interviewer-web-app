import AdminHeader from "@/components/adminHeader";
import { Button } from "@/components/ui/button";
import { createCategoryPath } from "@/constants/route";
import DashboardCategories from "@/features/admin/category/components/dashboard-categories";
import { Plus } from "lucide-react";

const page = () => {
  return (
    <div>
      <AdminHeader
        path={createCategoryPath}
        action={
          <Button className="bg-gradient-to-r from-sky-500 to-yellow-400 text-black hover:opacity-90">
            <Plus className="mr-2 h-4 w-4" />
            Create Categories
          </Button>
        }
      />
      <DashboardCategories />
    </div>
  );
};

export default page;
