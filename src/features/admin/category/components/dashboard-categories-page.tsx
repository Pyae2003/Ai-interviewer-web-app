import { getAllCategories } from "../query/get-categories";
import DashboardCategories from "./dashboard-categories";

export default async function CategoriesDashboardPage() {
  const categories = await getAllCategories();
  console.log(categories)

  return <DashboardCategories categories={categories} />;
}