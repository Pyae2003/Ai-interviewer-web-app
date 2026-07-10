import { CategoryCard } from "./category-card";

export type CategoryGroupList = {
  id: string;
  name: string;
  slug: string;
  type: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  categoryCount: number;
};

export function CategoryGroupList({ id , name , slug } : CategoryGroupList) {
  return (
    <div className="space-y-4" >
      <CategoryCard key={id} title={name} href={slug} />
    </div>
  );
}
