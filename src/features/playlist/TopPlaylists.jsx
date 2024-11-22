import { useTopPlaylists } from "@/features/playlist/useTopPlaylists";
import PlaylistItem from "@/features/playlist/PlaylistItem";

function TopPlaylists() {
  const { topPlaylists, isLoading } = useTopPlaylists();
  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="justify-content-between grid w-full grid-cols-12 gap-x-6 gap-y-6">
      {topPlaylists.map((playlist) => (
        <PlaylistItem key={playlist.id} playlist={playlist} />
      ))}
    </div>
  );
}

export default TopPlaylists;
