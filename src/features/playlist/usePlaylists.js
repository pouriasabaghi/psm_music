import { getPlayLists } from "@/services/apiPlaylists";
import { useQuery } from "@tanstack/react-query";

export const usePlaylists = () => {
  const { data: playlists, isLoading } = useQuery({
    queryKey: ["playlists"],
    queryFn: getPlayLists,
  });

  return { playlists, isLoading };
};
