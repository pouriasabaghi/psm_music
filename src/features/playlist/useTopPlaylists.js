import { getTopPlaylists } from "@/services/apiPlaylists";
import { useQuery } from "@tanstack/react-query";

export const useTopPlaylists = () => {
  const { data: topPlaylists, isLoading } = useQuery({
    queryKey: ["top-playlists"],
    queryFn: getTopPlaylists,
  });
  return { topPlaylists, isLoading };
};
