import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSong as updateSongApi } from "../../services/apiSongs";
import { toast } from "sonner";

export function useUpdateSong() {
  const queryClient = useQueryClient();
  const { mutate: updateSong, isPending } = useMutation({
    mutationFn: ({ id, data }) => updateSongApi(id, data),
    mutationKey: ["song"],
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["songs"] });
    },
    onError: (err) => {
      toast.error(err.response.data.error);
    }
  });

  return {updateSong, isPending};
}
