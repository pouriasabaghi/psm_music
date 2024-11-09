import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { useForm } from "react-hook-form";
import useCreatePlaylist from "./useCreatePlaylist";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { useState } from "react";
import { usePlayer } from "@/context/PlayerContext";
import { useSongs } from "../songs/useSongs";
import { usePlaylists } from "./usePlaylists";
import useAddSongToPlaylist from "./useAddSongToPlaylist";
import { MdAdd, MdAddCircleOutline } from "react-icons/md";
import CreatePlayListForm from "./CreatePlayListForm";

function AddSongToPlaylist({ song, trigger }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { playlists, isLoading } = usePlaylists();

  const { addSongToPlaylist, isPending } = useAddSongToPlaylist();

  const [open, setOpen] = useState(false);

  function handleAddSong(playlistId, songId) {
    console.log(playlistId, songId);

    addSongToPlaylist({
      playlistId,
      songId,
    });
  }

  if (isLoading) return <div>Loading....</div>;

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
