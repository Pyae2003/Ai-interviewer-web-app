import { adminDashboardPath, adminInterviewsPath, adminUserManagemant, categoriesdashboardPath, questionDashboardWithCategoryNamePath, questionsDashboardPath } from "@/constants/route";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileQuestion,
  Mic,
  TrendingUp,
  Settings,
} from "lucide-react";

export const navDataArray = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path :adminDashboardPath,
    active: true,
  },
  {
    icon: Users,
    label: "Users",
    path : adminUserManagemant
  },
  {
    icon: Briefcase,
    label: "Category Group",
    path : categoriesdashboardPath
  },
  {
    icon: Briefcase,
    label: "Categories",
    path : categoriesdashboardPath
  },
  {
    icon: FileQuestion,
    label: "Questions",
    path : questionsDashboardPath
  },
  {
    icon: Mic,
    label: "Interviews",
    path : adminInterviewsPath
  },
  {
    icon: TrendingUp,
    label: "Analytics",
    path : "admin/analytics"
  },
  {
    icon: Settings,
    label: "Settings",
    path : "admin/settings"
  },
];
