import { getTopSongs } from "@/services/apiSongs";
import { useQuery } from "@tanstack/react-query";

export function useTopSongs() {
  const { data: topSongs, isLoading } = useQuery({
    queryKey: ["top-songs"],
    queryFn: getTopSongs,
  });

  return { topSongs, isLoading };
}
