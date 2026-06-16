import { AppError } from "@/middleware";

type AuthUser = {
  id: string;
  email: string;
  role: string;
};

export function requireAdmin(
  user: AuthUser | null | undefined,
): asserts user is AuthUser {
  if (!user) {
    throw new AppError(
      "Authentication required",
      "UNAUTHORIZED",
      401,
    );
  }

  if (user.role !== "ADMIN") {
    console.warn(
      `[FORBIDDEN_ACCESS] User ${user.id} attempted admin access`,
    );

    throw new AppError(
      "Admin access required",
      "FORBIDDEN",
      403,
    );
  }
}