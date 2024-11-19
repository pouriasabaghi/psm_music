import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleFollow as toggleFollowApi } from "../../services/apiFollows";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const usePlaylistFollowToggle = () => {
  const navigate = useNavigate();
  const queryClient= useQueryClient();
  const { mutate: toggleFollow, isPending } = useMutation({
    mutationFn: (playlistId) => toggleFollowApi(playlistId),
    mutationKey: ["follow"],
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["followedPlaylists"] });
    },
    onError: (err) => {
      if (err.status === 401) {
        toast.error("You need to login first");
        navigate("/login");
        return;
      }

      toast.error(err.response.data.message);
    },
  });

  return { toggleFollow, isPending };
};
