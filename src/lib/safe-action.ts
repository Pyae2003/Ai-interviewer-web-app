import { AppError } from "@/middleware";
import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient({
    handleServerError(error) {
    if (error instanceof AppError) {
      return {
        message: error.message,
        statusCode: error.statusCode,
      };
    }

    return {
      message: "Internal server error",
      statusCode: 500,
    };
  },
});