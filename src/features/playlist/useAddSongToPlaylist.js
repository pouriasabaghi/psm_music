import {useMutation} from "@tanstack/react-query";
import {addSongToPlaylist as addSongToPlaylistApi} from "../../services/apiPlaylists";
import { toast } from "sonner";

function useAddSongToPlaylist() {
    const {mutate: addSongToPlaylist, isPending} = useMutation({
        mutationFn: ({playlistId, songId}) => addSongToPlaylistApi(playlistId, songId),
        onSuccess: (data) => {
            toast.success(data.message);
        },
        onError: (err) => {
            toast.error(err.response.data.error);
        },
    });

    return {addSongToPlaylist, isPending};
}

export default useAddSongToPlaylist;