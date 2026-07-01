import { UserRole } from "@/generated/prisma/enums";

export type GetUsersParams = {
  search?: string;
  page?: number;
  limit?: number;
};

export type UserListItem = {
  id: string;
  name: string;
  email: string;
  role: string;
  banned: boolean;
  emailVerified: boolean;
  createdAt: Date;
};

export type GetUsersResponse = {
  success: boolean;
  users: UserListItem[];
  total: number;
  page: number;
  totalPages: number;
};

export type AdminUserStatsResponse = {
  success: boolean;

  data: {
    totalUsers: number;
    activeUsers: number;
    admins: number;
    bannedUsers: number;
  };
};

export type UserManagementPageProp = {
  usersStats: {
    totalUsers: number;
    activeUsers: number;
    admins: number;
    bannedUsers: number;
  };
  usersInfo: {
    id: string;
    name: string;
    email: string;
    role: string | null;
    status: string;
    banned : boolean;
    interviews: number;
    joinedAt: Date;
    lastLogin: Date | null;
  }[];
};

export type RecentInterview = {
  id: string;
  category: string;
  score: number;
  status: string;
  createdAt: Date;
};

export  type UserDetail = {
  id: string;

  name: string;

  email: string;

  role: "user" | "admin" | null;

  status: string;
  banned : boolean;

  joinedAt: Date;

  lastLogin: Date | null;

  interviews: number;

  avgScore: number;

  passed: number;

  failed: number;

  recentInterviews: RecentInterview[];
};

