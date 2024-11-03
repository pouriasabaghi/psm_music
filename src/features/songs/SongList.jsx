import SongItem from "./SongItem";
import { useSongs } from "./useSongs";


function SongList() {
  const {songs, isPending} = useSongs();

  if(isPending) return <div>Loading...</div>
  return (
    <div className="space-y-4" role="list">
     
      {songs.map((song) => (
        <SongItem key={song.id} song={song} />
      ))}
    </div>
  );
}

export default SongList;
