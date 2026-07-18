import { notFound } from "next/navigation";
import { FolderOpen } from "lucide-react";
import { getAllCategoryGroups } from "@/features/admin/categoryGroup/query/get-all-category-groups";
import { CategoryHeader } from "./categoy-header";
import { CategoryGroupList } from "./category-groups-list";
import { DashboardHeadline } from "./dashboare-headline";

const MainDashboard = async () => {
  const categoryGroup = await getAllCategoryGroups();
  if (!categoryGroup.data) {
    notFound();
  }
  const categoryGroups = categoryGroup.data.data;
  const hasCategories = categoryGroups.length > 0;
  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent">
      {" "}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-sky-200/25 blur-3xl dark:bg-sky-800/10"
      />{" "}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-24 h-96 w-96 rounded-full bg-yellow-200/25 blur-3xl dark:bg-yellow-700/10"
      />{" "}
      <section className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {" "}
        <DashboardHeadline />{" "}
        <div className="mt-12 rounded-3xl border border-black/5 bg-white/75 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/75 sm:p-6 lg:p-8">
          {" "}
          <CategoryHeader />{" "}
          {hasCategories ? (
            <div className="mt-8 grid gap-5">
              {" "}
              {categoryGroups.map((categoryGroupName) => (
                <CategoryGroupList
                  key={categoryGroupName.id}
                  {...categoryGroupName}
                />
              ))}{" "}
            </div>
          ) : (
            <div className="mt-8 flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-black/10 bg-zinc-50/70 px-6 py-12 text-center dark:border-white/10 dark:bg-zinc-950/40">
              {" "}
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-sky-100 to-yellow-100 text-sky-600 shadow-sm dark:from-sky-950 dark:to-yellow-950 dark:text-sky-400">
                {" "}
                <FolderOpen className="h-6 w-6" aria-hidden="true" />{" "}
              </div>{" "}
              <h2 className="mt-5 text-xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                {" "}
                No categories found{" "}
              </h2>{" "}
              <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                {" "}
                Create your first interview category to start organizing
                questions and practice sessions.{" "}
              </p>{" "}
            </div>
          )}{" "}
        </div>{" "}
      </section>{" "}
    </main>
  );
};
export default MainDashboard;
