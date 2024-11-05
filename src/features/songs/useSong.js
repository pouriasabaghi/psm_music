import { getSongById } from "@/services/apiSongs";
import { useQuery } from "@tanstack/react-query";

export function useSong(id) {
  const { data: song, isLoading } = useQuery({
    queryKey: ["song"],
    queryFn: () => getSongById(id),
    enabled: !!id,
  });

  return { song, isLoading };
}
