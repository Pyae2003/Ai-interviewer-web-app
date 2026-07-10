"use server";

import { notFound } from "next/navigation";
import { FolderOpen, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { getCategoryGroupBySlug } from "@/features/admin/category/query/get-categories-by-slug";

import CategoriesList from "./categories-list";

type CategoryListPageProps = {
  slug: string;
};

export default async function CategoryListPage({
  slug,
}: CategoryListPageProps) {
  const result = await getCategoryGroupBySlug({
    slug,
  });

  if (!result?.data?.success) {
    notFound();
  }

  const categoryGroup = result.data.data;

  if (categoryGroup.categories.length === 0) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-6">
        <div className="w-full max-w-lg rounded-3xl border bg-card p-10 text-center shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sky-100">
            <FolderOpen className="h-10 w-10 text-sky-600" />
          </div>

          <h2 className="mt-6 text-2xl font-bold">No Categories Yet</h2>

          <p className="mt-3 text-muted-foreground leading-7">
            There are currently no interview categories available in
            <span className="font-semibold text-foreground">
              {" "}
              {categoryGroup.name}
            </span>
            .
            <br />
            Please check back later.
          </p>

          <Button asChild className="mt-8 rounded-xl">
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{categoryGroup.name}</h1>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categoryGroup.categories.map((category) => (
          <CategoriesList key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}
