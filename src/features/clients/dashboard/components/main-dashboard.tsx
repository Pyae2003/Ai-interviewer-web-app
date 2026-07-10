import { notFound } from "next/navigation";
import { getAllCategoryGroups } from "@/features/admin/categoryGroup/query/get-all-category-groups";
import { CategoryHeader } from "./categoy-header";
import { CategoryGroupList } from "./category-groups-list";

const MainDashboard = async () => {
  const categoryGroup = await getAllCategoryGroups();  
  if (!categoryGroup.data) {
    notFound();
  }

  return (
    <section className="space-y-6">
      {categoryGroup.data.data.length === 0 ? (
        <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
          <h3 className="text-lg font-semibold text-zinc-900">
            No Categories Found
          </h3>

          <p className="mt-2 text-sm text-zinc-500">
            Create your first interview category.
          </p>
        </div>
      ) : (
        <main className="min-h-screen bg-linear-to-br from-slate-50 via-white to-sky-50">
          <section className="mx-auto max-w-3xl px-6 py-16">
            <CategoryHeader />

            <div className="mt-12">
              {categoryGroup.data.data.map((categoryGroupName) => (
                <CategoryGroupList
                  key={categoryGroupName.id}
                  {...categoryGroupName}
                />
              ))}
            </div>
          </section>
        </main>
      )}
    </section>
  );
};

export default MainDashboard;
