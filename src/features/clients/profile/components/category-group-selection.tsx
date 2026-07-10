import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { FolderOpen, Trophy, Layers3 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import CategoryCard from "./category-card";

type Props = {
  groups: {
    id: string;
    name: string;
    slug: string;
    categories: {
      id: string;
      name: string;
      latestScore: number;
      interviews: number;
    }[];
  }[];
};

export default function CategoryGroupSection({ groups }: Props) {
  return (
    <Accordion type="multiple" className="space-y-6">
      {groups.map((group) => {
        const highestScore =
          group.categories.length > 0
            ? Math.max(...group.categories.map((x) => x.latestScore))
            : 0;

        const totalInterview = group.categories.reduce(
          (sum, item) => sum + item.interviews,
          0,
        );

        return (
          <AccordionItem
            key={group.id}
            value={group.id}
            className="
              overflow-hidden
              rounded-3xl
              border
              bg-white
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
            "
          >
            <AccordionTrigger className="px-4 py-5 sm:px-6 hover:no-underline">
              <div className="flex w-full flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                {/* Left */}
                <div className="flex items-center gap-4">
                  <div
                    className="
                    flex
                    h-14
                    w-14
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-linear-to-br
                    from-sky-500
                    to-cyan-500
                    text-white
                    shadow-md
                  "
                  >
                    <FolderOpen className="h-7 w-7" />
                  </div>

                  <div className="min-w-0 text-left">
                    <h2 className="truncate text-lg font-bold sm:text-xl">
                      {group.name}
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {group.categories.length} Categories • {totalInterview}{" "}
                      Interviews
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-end">
                  <Badge
                    variant="secondary"
                    className="justify-center rounded-full px-4 py-1"
                  >
                    <Layers3 className="mr-1 h-4 w-4" />
                    {group.categories.length}
                  </Badge>

                  <Badge
                    className="
                      justify-center
                      rounded-full
                      bg-yellow-500
                      px-4
                      py-1
                      text-white
                    "
                  >
                    <Trophy className="mr-1 h-4 w-4" />
                    {highestScore}%
                  </Badge>
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="border-t bg-muted/20">
              {/* Summary */}
              <div className="space-y-5 px-4 py-5 sm:px-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm font-medium">
                    <span>Highest Score</span>

                    <span className="text-sky-600">{highestScore}%</span>
                  </div>

                  <Progress value={highestScore} className="h-2" />
                </div>

                {group.categories.length > 0 ? (
                  <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {group.categories.map((category) => (
                      <CategoryCard key={category.id} {...category} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-12 text-center">
                    <FolderOpen className="mb-4 h-10 w-10 text-muted-foreground" />

                    <h3 className="font-semibold">No Categories Yet</h3>

                    <p className="mt-2 max-w-md text-sm text-muted-foreground">
                      There are currently no interview categories available in
                      this category group.
                    </p>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
