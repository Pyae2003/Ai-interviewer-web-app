import { CalendarDays, BadgeCheck, Mail, User, Pencil } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Props = {
  id: string;
  name: string;
  email: string;
  role: string;
  image: string | null;
  joined: Date;

  totalInterviews: number;
  totalCategories: number;

  averageScore: number;
  bestScore: number;

  lastInterview: Date | null;

  performance:
    | "Excellent"
    | "Very Good"
    | "Good"
    | "Average"
    | "Needs Improvement";
};

export default function ProfileHeader({
  name,
  email,
  role,
  joined,
  totalInterviews,
  totalCategories,
  performance,
  averageScore,
}: Props) {
  return (
    <section className="overflow-hidden rounded-3xl border bg-white shadow-lg">
      {/* Cover */}
      <div className="relative h-36 bg-linear-to-r from-sky-500 via-cyan-400 to-yellow-400">
        <div className="absolute inset-0 bg-black/5" />
      </div>

      <div className="relative px-6 pb-8">
        {/* Avatar */}
        <div className="-mt-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <Avatar className="h-28 w-28 border-4 border-white shadow-xl">
              <AvatarFallback className="bg-sky-100 text-4xl font-bold text-sky-700">
                {name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight">{name}</h1>

                <Badge
                  variant="secondary"
                  className="rounded-full bg-green-100 text-green-700"
                >
                  <BadgeCheck className="mr-1 h-4 w-4" />
                  Verified
                </Badge>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {email}
                </div>

                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {role}
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  Joined{" "}
                  {joined.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>

          <Button size="lg" className="rounded-xl">
            <Pencil className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-2xl border bg-sky-50 p-5">
            <p className="text-sm text-muted-foreground">Interviews</p>

            <h3 className="mt-2 text-3xl font-bold">{totalInterviews}</h3>
          </div>

          <div className="rounded-2xl border bg-yellow-50 p-5">
            <p className="text-sm text-muted-foreground">Average Score</p>

            <h3 className="mt-2 text-3xl font-bold">{averageScore}%</h3>
          </div>

          <div className="rounded-2xl border bg-green-50 p-5">
            <p className="text-sm text-muted-foreground">Performance</p>

            <h3 className="mt-2 text-3xl font-bold text-green-600">
              {performance}
            </h3>
          </div>

          <div className="rounded-2xl border bg-violet-50 p-5">
            <p className="text-sm text-muted-foreground">Categories</p>

            <h3 className="mt-2 text-3xl font-bold">{totalCategories}</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
