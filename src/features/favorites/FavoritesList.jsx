import SongItem from "../songs/SongItem";
import { useFavorites } from "./useFavorites";

function FavoritesList() {
  const { favorites, isLoading } = useFavorites();

  if (isLoading) return null;

  if(favorites.length === 0) return <div>No favorites yet</div>;

  return (
    <div className="space-y-4" role="list">
      {favorites?.map((song) => (
        <SongItem key={song.id} song={song} />
      ))}
    </div>
  );
}

export default FavoritesList;
