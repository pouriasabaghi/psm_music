import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    retry: (failureCount, error) => {
      if (error.status === 401) return 0;

      return failureCount < 3;
    },
  });

  return { user, isLoading, isAuthenticated: !!user };
}
