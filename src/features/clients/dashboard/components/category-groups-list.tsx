import { CategoryGroupListItem } from "@/features/admin/categoryGroup/query/get-all-category-groups";
import { CategoryCard } from "./category-card";

export function CategoryGroupList({ id , name , slug } : CategoryGroupListItem) {
  return (
    <div className="space-y-4" >
      <CategoryCard key={id} title={name} href={slug} />
    </div>
  );
}
