import { toggleFavorite as toggleFavoriteApi } from "@/services/apiFavorites";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useToggleFavorite() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: toggleFavorite, isPending } = useMutation({
    mutationKey:["favorite_toggle"],
    mutationFn: (id) => toggleFavoriteApi(id),
    onError: (err) => {
      toast.error(err.response.data.message);

      if (err.status === 401) {
        navigate("/login");
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["favorites", "songs", "top-songs"]);
    }
  });
  return { toggleFavorite, isPending };
}
