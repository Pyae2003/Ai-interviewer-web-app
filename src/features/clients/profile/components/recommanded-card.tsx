import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RecommendationCard() {
  return (
    <Card className="rounded-3xl bg-linear-to-r from-sky-500 to-yellow-400 p-8 text-white">
      <h2 className="text-2xl font-bold">
        AI Recommendation
      </h2>

      <p className="mt-3">
        Based on your recent interviews, we recommend
        taking the Advanced Next.js interview next.
      </p>

      <Button
        className="mt-6"
        variant="secondary"
      >
        Start Interview
      </Button>
    </Card>
  );
}