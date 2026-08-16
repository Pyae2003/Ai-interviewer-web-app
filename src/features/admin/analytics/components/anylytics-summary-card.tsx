import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type AnalyticsSummaryCardProps = {
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;
  iconClassName: string;
};

export default function AnalyticsSummaryCard({
  title,
  value,
  description,
  icon: Icon,
  iconClassName,
}: AnalyticsSummaryCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-5">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>

          <p className="mt-2 text-3xl font-bold text-foreground">
            {value.toLocaleString()}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            {description}
          </p>
        </div>

        <div className={`rounded-xl p-3 ${iconClassName}`}>
          <Icon className="h-6 w-6" />
        </div>
      </CardContent>
    </Card>
  );
}