import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";

import { usePlaylists } from "./usePlaylists";
import useAddSongToPlaylist from "./useAddSongToPlaylist";
import FullPageSpinner from "@/ui/FullPageSpinner";

function AddSongToPlaylist({ song, trigger }) {
  const { playlists, isLoading } = usePlaylists();

  const { addSongToPlaylist, isPending } = useAddSongToPlaylist();

  function handleAddSong(playlistId, songId) {
    addSongToPlaylist({
      playlistId,
      songId,
    });
  }

  if (isLoading) return <FullPageSpinner />;

  return (
    <Dialog>
      <DialogTrigger onClick={(e) => e.stopPropagation()}>
        {trigger}
      </DialogTrigger>

      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add to playlist</DialogTitle>
        </DialogHeader>

        <ul className="max-h-96 overflow-y-scroll">
          {playlists.map((playlist) => (
            <li
              disabled={isPending}
              className="py-2"
              onClick={() => handleAddSong(playlist.id, song.id)}
              key={playlist.id}
            >
              {playlist.name}
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}

export default AddSongToPlaylist;
