export type ProfilePerformance =
  | "Excellent"
  | "Very Good"
  | "Good"
  | "Average"
  | "Needs Improvement";

export type ProfileHeaderProps = Readonly<{
  id: string;
  name: string;
  email: string;
  role: string;
  emailVerified : boolean;
  image: string | null;
  joined: Date;
  totalInterviews: number;
  totalCategories: number;
  averageScore: number;
  bestScore: number;
  lastInterview: Date | null;
  performance: ProfilePerformance;
}>;