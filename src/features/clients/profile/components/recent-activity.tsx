import { Card } from "@/components/ui/card";
import { ActivityItem } from "../query/get-recent-interviews";

type Props = {
  items: ActivityItem[];
};

export default function RecentActivity({ items }: Props) {
  return (
    <Card className="rounded-2xl p-6">
      <h2 className="mb-6 text-xl font-bold">Recent Activity</h2>

      <div className="space-y-5">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between">
            <div>
              <h3>{item.category}</h3>

              <p className="text-sm text-muted-foreground">
                {item.createdAt.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            <span className="font-bold">{item.score}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
