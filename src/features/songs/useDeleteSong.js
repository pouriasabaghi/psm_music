import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSong as deleteSongApi } from "@/services/apiSongs";
import { toast } from "sonner";

export function useDeleteSong() {
  const queryClient = useQueryClient();
  const { mutate: deleteSong, isLoading } = useMutation({
    mutationFn: (id) => deleteSongApi(id),
    mutationKey: ["song"],
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["songs"] });
    },
    onError: (err) => {
      toast.error(err.response.data.error);
    },
  });

  return { deleteSong, isLoading };
}
