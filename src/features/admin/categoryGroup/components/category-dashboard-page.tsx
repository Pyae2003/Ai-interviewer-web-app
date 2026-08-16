import CategoryGroupDashboard from "./category-dashboard";
import { getAllCategoryGroups } from "../query/get-all-category-groups";

export default async function CategoryGroupDashboardPage() {
  const result = await getAllCategoryGroups();

  if (result.serverError) {
    return (
      <div
        role="alert"
        className="m-6 rounded-xl border border-red-200 bg-red-50 p-6 text-red-700"
      >
        <h1 className="font-semibold">
          Unable to load category groups
        </h1>

        <p className="mt-1 text-sm">{result.serverError.message}</p>
      </div>
    );
  }

  const groups = result.data?.data ?? [];

  if (groups.length === 0) {
    return (
      <div className="m-6 rounded-xl border bg-card p-8 text-center">
        <h1 className="text-lg font-semibold text-foreground">
          No category groups yet
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Create your first category group to get started.
        </p>
      </div>
    );
  }

  return <CategoryGroupDashboard groups={groups} />;
}