import { getPlaylist } from "@/services/apiPlaylists";
import { useQuery } from "@tanstack/react-query";

export const usePlaylist = (id)=>{
    const { data: playlist, isLoading } = useQuery({
        queryKey: ["playlist"],
        queryFn: () => getPlaylist(id),
      });
      
      return { playlist, isLoading };   
}