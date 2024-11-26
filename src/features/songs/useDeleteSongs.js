import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSongs as deleteSongsApi } from "@/services/apiSongs";
import { toast } from "sonner";

export function useDeleteSongs() {
  const queryClient = useQueryClient();

  const { mutate: deleteSongs, isPending } = useMutation({
    mutationKey: ["delete_songs"],
    mutationFn: (songsIds) => deleteSongsApi(songsIds),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["songs"] });
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  return { deleteSongs, isPending };
}
