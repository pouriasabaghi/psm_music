import { useEffect } from "react";
import SongItem from "../songs/SongItem";
import { useFavorites } from "./useFavorites";
import { usePlayer } from "@/context/PlayerContext";

function FavoritesList() {
  const { favorites, isLoading } = useFavorites();

  const { setList } = usePlayer();
  useEffect(() => {
    setList("favorites");
  }, [setList]);

  if (isLoading) return null;

  if (favorites.length === 0) return <div>No favorites yet</div>;

  return (
    <div className="space-y-4" role="list">
      {favorites?.map((song) => (
        <SongItem key={song.id} song={song} />
      ))}
    </div>
  );
}

export default FavoritesList;
