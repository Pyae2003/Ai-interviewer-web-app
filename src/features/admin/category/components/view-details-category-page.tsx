import { notFound } from "next/navigation";
import { getCategoryById } from "../query/get-category";
import ViewDetailCategory from "./view-details";

type ViewDetailCategoryPageProps = {
  id: string;
};

export default async function ViewDetailCategoryPage({
  id,
}: ViewDetailCategoryPageProps) {
  const result = await getCategoryById({ id });

  if (result.validationErrors) {
    notFound();
  }

  if (result.serverError) {
    return (
      <div
        role="alert"
        className="m-6 rounded-xl border border-red-200 bg-red-50 p-6 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
      >
        <h1 className="font-semibold">Unable to load category</h1>

        <p className="mt-1 text-sm">{result.serverError.message}</p>
      </div>
    );
  }

  const category = result.data?.data;

  if (!category) {
    notFound();
  }

  return <ViewDetailCategory category={category} />;
}
