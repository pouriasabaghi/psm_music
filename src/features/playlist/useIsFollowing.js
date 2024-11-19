import { useQuery } from "@tanstack/react-query";
import { isFollowing as isFollowingApi } from "../../services/apiFollows";
import { useUser } from "../authentication/useUser";

export const useIsFollowing = (playlistId) => {
  const { isAuthenticated } = useUser();
  const { data: isFollowing, isLoading } = useQuery({
    queryKey: ["isFollowedPlaylist", playlistId],
    queryFn: () => isFollowingApi(playlistId),
    enabled: isAuthenticated,
  });

  return { isFollowing, isLoading };
};
