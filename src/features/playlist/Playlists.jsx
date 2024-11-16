import PlaylistItem from "./PlaylistItem";
import { usePlaylists } from "./usePlaylists";

function Playlists() {
  const { playlists, isLoading } = usePlaylists();

  if (isLoading) return <div>Loading...</div>;

  return (
      <div className="justify-content-between grid w-full grid-cols-12 gap-x-6 gap-y-6">
        {playlists.map((list) => (
          <PlaylistItem key={list.id} playlist={list} />
        ))}
      </div>
  );
}

export default Playlists;
