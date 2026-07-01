import { toast } from "sonner";

type ActionFn<T> = () => Promise<T>;

export async function executeAdminAction<T>(
  action: ActionFn<T>,
  messages: {
    loading: string;
    success: string;
    error: string;
  },
) {
  const promise = action();

  toast.promise(promise, {
    loading: messages.loading,
    success: messages.success,
    error: (error) =>
      error?.message || messages.error,
  });

  return promise;
}