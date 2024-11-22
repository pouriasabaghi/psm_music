import { useTopSongs } from "./useTopSongs";
import SongItem from "@/features/songs/SongItem";


function TopSongs() {
  const { topSongs, isLoading } = useTopSongs();

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="space-y-4" role="list">
      {topSongs.map((song) => (
        <SongItem key={song.id} song={song} />
      ))}
    </div>
  );
}

export default TopSongs;
