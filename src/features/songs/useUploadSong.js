import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadSong } from "../../services/apiSongs";
import { toast } from "sonner";

export function useUploadSong() {
  const queryClient = useQueryClient();

  const { mutate: upload, isPending, data } = useMutation({
    mutationFn: ({ file, setProgress }) => uploadSong({ file, setProgress }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["songs"] });
      toast.success(data.message);
    },

    onError: (err) => {
      console.error("ERROR", err);
      toast.error(err.response.data.error);
    },

  });

  return { upload, isPending, data };
}
