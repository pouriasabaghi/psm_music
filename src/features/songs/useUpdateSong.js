import { useMutation } from "@tanstack/react-query";
import { updateSong as updateSongApi } from "../../services/apiSongs";
import toast from "react-hot-toast";

export function useUpdateSong() {
  const { mutate: updateSong, isPending } = useMutation({
    mutationFn: ({ id, data }) => updateSongApi(id, data),
    mutationKey: ["song"],
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (err) => {
      toast.error(err.response.data.error);
    }
  });

  return {updateSong, isPending};
}
