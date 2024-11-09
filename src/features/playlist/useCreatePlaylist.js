import { createPlayList as createPlayListApi } from "@/services/apiPlaylists";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

function useCreatePlaylist() {
  const queryClient = useQueryClient();
  const { mutate: createPlaylist, isPending } = useMutation({
    mutationFn: (name) => createPlayListApi(name),
    onSuccess: (data) => {
      toast(data.message);
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
    },
    onError: (err) => {
        toast.error(err.response.data.message  || err.message );
    },
  });

  return {createPlaylist, isPending};

}

export default useCreatePlaylist;
