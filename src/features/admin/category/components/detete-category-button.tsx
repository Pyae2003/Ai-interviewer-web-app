"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteCategory } from "../actions/delete-single-categorie";

type Props = {
  categoryId: string;
};

export default function DeleteCategoryButton({ categoryId }: Props) {
  const handleDelete = async () => {
     await deleteCategory(categoryId)
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      className="flex-1"
      onClick={() => handleDelete()}
    >
      <Trash2 className="mr-2 h-4 w-4" />
      Delete
    </Button>
  );
}
