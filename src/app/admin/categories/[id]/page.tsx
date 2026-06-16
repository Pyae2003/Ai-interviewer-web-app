import AdminHeader from "@/components/adminHeader";
import { Button } from "@/components/ui/button";
import {
  categoriesdashboardPath,
  questionDashboardWithCategoryNamePath,
} from "@/constants/route";
import Link from "next/link";

type Prop = {
  params: Promise<{ id: string }>;
};
const page = async ({ params }: Prop) => {
  const { id } = await params;
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <AdminHeader path={categoriesdashboardPath} />

      {/* Main Content */}
      <main className="mx-auto flex max-w-3xl flex-col gap-6 p-6">
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-800">
            Category Dashboard
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage and view all questions under this category.
          </p>

          <div className="mt-6">
            <Link
              href={questionDashboardWithCategoryNamePath(id)}
              className="inline-flex items-center rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700 active:scale-[0.98]"
            >
              Go to Questions
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
