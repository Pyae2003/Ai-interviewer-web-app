import Link from "next/link";
import { ChevronRight, Menu } from "lucide-react";
import { categoryGroupPath } from "@/constants/route";

type Props = {
  title: string;
  href: string;
};

export function CategoryCard({ title, href }: Props) {
  return (
    <Link
      href={categoryGroupPath(href)}
      className="
      group
      flex
      items-center
      justify-between
      rounded-xl
      border
      bg-white
      p-5
      shadow-sm
      transition-all
      duration-300
      hover:-translate-y-1
      hover:border-sky-400
      hover:shadow-xl
      "
    >
      <div className="flex items-center gap-4">
        <div className="rounded-lg bg-sky-100 p-2 transition group-hover:bg-sky-200">
          <Menu className="h-5 w-5 text-sky-600" />
        </div>

        <span className="text-lg font-semibold">{title}</span>
      </div>

      <ChevronRight className="h-5 w-5 text-gray-400 transition group-hover:translate-x-1 group-hover:text-sky-600" />
    </Link>
  );
}
