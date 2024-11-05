import { toggleFavorite as toggleFavoriteApi } from "@/services/apiFavorites";
import { useMutation, useQueryClient,  } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useToggleFavorite() {
  const queryClient = useQueryClient();
  const { mutate: toggleFavorite, isPending } = useMutation({
    mutationFn: (id) => toggleFavoriteApi(id),
    onError: (err) => {
      toast.error(err.response.data.error);
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
  return { toggleFavorite, isPending };
}
