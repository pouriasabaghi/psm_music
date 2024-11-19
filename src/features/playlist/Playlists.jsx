import PlaylistSkeleton from "@/ui/PlaylistSkeleton";
import PlaylistItem from "./PlaylistItem";
import { useFollowed } from "./useFollowed";
import { usePlaylists } from "./usePlaylists";

function Playlists() {
  const { playlists, isLoading } = usePlaylists();
  const { followedPlaylists, isLoading: followedIsLoading } = useFollowed();

  if (isLoading || followedIsLoading)
    return (
      <div className="justify-content-between grid w-full grid-cols-12 gap-x-6 gap-y-6">
        <PlaylistSkeleton count={6} />
      </div>
    );

  return (
    <div className="justify-content-between grid w-full grid-cols-12 gap-x-6 gap-y-6">
      {playlists.map((list) => (
        <PlaylistItem key={list.id} playlist={list} />
      ))}

      {followedPlaylists.map((list) => (
        <PlaylistItem key={list.id} playlist={list} />
      ))}
    </div>
  );
}

export default Playlists;
