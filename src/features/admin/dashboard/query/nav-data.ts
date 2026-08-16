import { adminAnalyticsPath, adminDashboardPath, adminUserManagemant, categoriesdashboardPath, categoryGroupDashboardPath, questionsDashboardPath } from "@/constants/route";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileQuestion,
  TrendingUp,
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
    path : categoryGroupDashboardPath
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
    icon: TrendingUp,
    label: "Analytics",
    path : adminAnalyticsPath
  },
  
];
