
import { Category } from "@/generated/prisma/client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Briefcase, FileQuestion, Mic, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { updateCategoryPath } from "@/constants/route";
import { deleteCategory } from "../actions/delete-single-categorie";
import DeleteCategoryButton from "./detete-category-button";

type CategoriesProp = {
  category: Category;
};

const CategoriesList = ({ category }: CategoriesProp) => {
  return (
    <Card className="group overflow-hidden border-0 bg-gradient-to-br from-sky-100/40 via-white to-yellow-100/50 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-yellow-300 shadow-md">
              <Briefcase className="h-6 w-6 text-black" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-zinc-900">
                {category.name}
              </h3>

              <p className="line-clamp-2 text-sm text-zinc-500">
                {category.description || "No description available"}
              </p>
            </div>
          </div>

          <Badge
            className={
              category.isActive
                ? "border-green-200 bg-green-100 text-green-700"
                : "border-red-200 bg-red-100 text-red-700"
            }
          >
            {category.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-sky-50 p-3 text-center">
            <FileQuestion className="mx-auto mb-1 h-5 w-5 text-sky-600" />

            <p className="text-lg font-bold text-zinc-900">120</p>

            <p className="text-xs text-zinc-500">Questions</p>
          </div>

          <div className="rounded-xl bg-yellow-50 p-3 text-center">
            <Mic className="mx-auto mb-1 h-5 w-5 text-yellow-600" />

            <p className="text-lg font-bold text-zinc-900">45</p>

            <p className="text-xs text-zinc-500">Interviews</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-sky-200 hover:bg-sky-50"
            >
              <Pencil className="mr-2 h-4 w-4" />
          <Link href={updateCategoryPath(category.id)}>

                Edit
              </Link>
            </Button>
         <DeleteCategoryButton categoryId={category.id}/>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoriesList;
