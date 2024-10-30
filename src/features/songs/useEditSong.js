import { useQuery } from "@tanstack/react-query";
import { getSongById } from "../../services/apiSongs";

export function useEditSong(id) {
  const { data: song, isLoading,  } = useQuery({
    queryKey: ["song"],
    queryFn: () => getSongById(id),
    enabled: !!id,
  });

  return { song, isLoading };
}
