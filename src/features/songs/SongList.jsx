import SongItem from "./SongItem";
import { useSongs } from "./useSongs";

function SongList() {
  const songs = [
    {
      id: 1,
    },
    {
      id: 2,
    }
  ];

  return (
    <div className="space-y-4" role="list">
      {songs.map((song) => (
        <SongItem key={song.id} song={song} />
      ))}
    </div>
  );
}

export default SongList;
