import { notFound } from "next/navigation";

import { getCategoryGroupById } from "../query/get-category-groups-with-id";
import ViewDetailCategoryGroup from "./view-detail-category-group";

type ViewDetailCategoryGroupPageProps = {
    id: string;
};

export default async function ViewDetailCategoryGroupPage({
  id,
}: ViewDetailCategoryGroupPageProps) {

  const result = await getCategoryGroupById({ id });

  if (result.validationErrors) {
    notFound();
  }

  if (result.serverError) {
    return (
      <div
        role="alert"
        className="m-6 rounded-xl border border-red-200 bg-red-50 p-6 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
      >
        <h1 className="font-semibold">
          Unable to load category group
        </h1>

        <p className="mt-1 text-sm">{result.serverError.message}</p>
      </div>
    );
  }

  const group = result.data?.data;

  if (!group) {
    notFound();
  }

  return <ViewDetailCategoryGroup group={group} />;
}