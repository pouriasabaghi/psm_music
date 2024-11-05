import { getFavorites } from "@/services/apiFavorites";
import { useQuery } from "@tanstack/react-query";

export function useFavorites() {
  const { data: favorites, isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
  });

  return { favorites, isLoading };
}
