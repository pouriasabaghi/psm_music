import { useQuery } from "@tanstack/react-query";
import { getSongs } from "../../services/apiSongs";

export function useSongs() {
  const { data: songs, isPending } = useQuery({
    queryKey: ["songs"],
    queryFn: getSongs,
  });

  return {songs, isPending};
}
