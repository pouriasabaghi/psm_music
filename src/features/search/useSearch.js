import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { search as searchApi } from "../../services/apiSearch";

export function useSearch(keyword) {
  const { data: songs, isPending, isLoading } = useQuery({
    queryKey: ["search", keyword],
    queryFn: ({ signal }) => searchApi(keyword, signal),

    onError: (err) => {
      toast.error(err.response.data.message);
    },
    enabled: !!keyword,
    staleTime: 60 * 1000,
  });

  return { songs, isPending, isLoading };
}
