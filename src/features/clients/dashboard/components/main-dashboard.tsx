import { getAllCategories } from "@/features/admin/category/query/get-categories";
import ClientCategoriesList from "./categories-list";



const MainDashboard = async () => {
  const categories = await getAllCategories();

  return (
    <section className="space-y-6">
      {categories.length === 0 ? (
        <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
          <h3 className="text-lg font-semibold text-zinc-900">
            No Categories Found
          </h3>

          <p className="mt-2 text-sm text-zinc-500">
            Create your first interview category.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 mx-auto max-w-7xl px-4 py-3">
          {categories.map((category) => (
            <ClientCategoriesList key={category.id} category={category} />
          ))}
        </div>
      )}
    </section>
  );
};


export default MainDashboard;