import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {removeFromPlaylist as removeFromPlaylistApi} from "../../services/apiPlaylists";

const useRemoveFromPlaylist = () => {
    const queryClient = useQueryClient();


    const { mutate: removeFromPlaylist, isPending } = useMutation({
        mutationFn: ({playlistId, songId}) => removeFromPlaylistApi(playlistId, songId),
        onSuccess: (data) => {          
          queryClient.invalidateQueries({ queryKey: ["playlist"] });
        },
        onError: (err) => {
          toast.error(err.response.data.message);
        },
      });
    
      return { removeFromPlaylist, isPending };
}

export default useRemoveFromPlaylist