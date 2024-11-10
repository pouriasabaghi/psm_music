import { updatePlaylist as updatePlaylistApi } from "@/services/apiPlaylists";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdatePlaylist = () => {
  const queryClient = useQueryClient();
  const { mutate: updatePlaylist, isPending } = useMutation({
    mutationFn: ({ playlistId, data }) => updatePlaylistApi(playlistId, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      toast.success(data.message);
    },
    onError: (err) => {
      toast.error(err.response.data.error);
    },
  });
  return { updatePlaylist, isPending };
};

