import SongItemOffline from "./SongItemOffline";
import { useOfflineSongs } from "./useOfflineSongs";
import SongSkeleton from "@/ui/SongSkeleton";

function SongListOffline() {
  const { songs, isPending } = useOfflineSongs();

  if (isPending)
    return (
      <div className="space-y-4">
        <SongSkeleton count={8} />
      </div>
    );

  if (songs.length === 0)
    return (
      <div>
        <p>You didn't add any song, try uploading one</p>
        <p>You are offline 😟</p>
      </div>
    );

  return (
    <div className="space-y-4" role="list">
      {songs.map((song) => (
        <SongItemOffline key={song.id} song={song} />
      ))}
    </div>
  );
}

export default SongListOffline;
