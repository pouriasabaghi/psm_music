import { useEffect } from "react";
import SongItem from "../songs/SongItem";
import { useFavorites } from "./useFavorites";
import { usePlayer } from "@/context/PlayerContext";
import SongSkeleton from "@/ui/SongSkeleton";
import { usePlayerController } from "@/context/PlayerControllerContext";

function FavoritesList() {
  const { favorites, isLoading } = useFavorites();

  const { dispatch } = usePlayer();
  const { play, stop } = usePlayerController();
  
  useEffect(() => {
    dispatch({ type: "song/list", payload: "favorites" });
  }, [dispatch]);

  if (isLoading) return <div className="space-y-4">
    <SongSkeleton count={8} />
  </div>;

  if (favorites.length === 0) return <div>No favorites yet</div>;

  return (
    <div className="space-y-4" role="list">
      {favorites?.map((song) => (
        <SongItem key={song.id} song={song} play={play} stop={stop} />
      ))}
    </div>
  );
}

export default FavoritesList;
