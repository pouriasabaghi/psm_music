import {useMutation} from "@tanstack/react-query";
import {addSongsToPlaylist as addSongsToPlaylistApi} from "../../services/apiPlaylists";
import { toast } from "sonner";

// for bulk of songs
function useAddSongsToPlaylist() {
    const {mutate: addSongsToPlaylist, isPending} = useMutation({
        mutationFn: ({playlistId, songsIds}) => addSongsToPlaylistApi(playlistId, songsIds),
        onSuccess: (data) => {
            toast.success(data.message);
        },

        onError: (err) => {
            toast.error(err.response.data.message);
        },
    });

    return {addSongsToPlaylist, isPending};
}

export default useAddSongsToPlaylist;