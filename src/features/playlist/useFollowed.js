import { useQuery } from "@tanstack/react-query";
import { followedPlaylists as followedPlaylistsApi } from "../../services/apiFollows";

export const useFollowed = () => {
  const { data: followedPlaylists, isLoading } = useQuery({
    queryKey: ["followedPlaylists"],
    queryFn: () => followedPlaylistsApi(),
  });

  return { followedPlaylists, isLoading };
};
