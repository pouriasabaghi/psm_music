import { toggleFavorite as toggleFavoriteApi } from "@/services/apiFavorites";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useToggleFavorite() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: toggleFavorite, isPending } = useMutation({
    mutationFn: (id) => toggleFavoriteApi(id),
    onError: (err) => {
      toast.error(err.response.data.message);
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      if (err.status === 401) {
        navigate("/login");
      }
    },
  });
  return { toggleFavorite, isPending };
}
