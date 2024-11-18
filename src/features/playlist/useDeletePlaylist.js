import { deletePlaylist as deletePlaylistApi } from "@/services/apiPlaylists";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useDeletePlaylist = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {mutate:deletePlaylist, isPending} = useMutation({
        mutationFn: (id) => deletePlaylistApi(id),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["playlists"] });
            navigate("/playlists",{replace: true});
        },

        onError: (err) => {
            toast.error(err.response.data.message);
        },
    });

    return {deletePlaylist, isPending};
}

export default useDeletePlaylist;