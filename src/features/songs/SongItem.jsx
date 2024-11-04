import {
  MdDeleteOutline,
  MdMoreVert,
  MdOutlineModeEditOutline,
} from "react-icons/md";
import { usePlayer } from "../../context/PlayerContext";
import headphoneImg from "./../../assets/img/headphone.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteSong } from "./useDeleteSong";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/ui/alert-dialog";

function SongItem({ song }) {
  const navigate = useNavigate();
  const { deleteSong } = useDeleteSong();
  const player = usePlayer();
  function handlePlayer() {
    // prevent resets song if song is already playing
    if (song.id !== player.currentSong?.id) {
      player.play(song);
    }

    navigate(`/songs/${song.id}`);
  }

  function handleDelete(id) {
    if (player.currentSong?.id === id) {
      player.stop();
      player.setCurrentSong(null);
    }
    deleteSong(id);
  }
  return (
    <div className="flex cursor-pointer items-center gap-x-3" role="listitem">
      <img
        onClick={handlePlayer}
        className="h-16 w-16 object-cover"
        width={64}
        height={64}
        src={song.cover || headphoneImg}
        alt="%song title%"
      />
      <div onClick={handlePlayer} className="flex flex-col gap-y-1">
        <span
          className={`max-w-64 overflow-hidden overflow-ellipsis text-nowrap ${player.currentSong?.id === song.id ? "text-purple-500" : "text-white"}`}
        >
          {song.name}
        </span>
        <div className="max-w-64 overflow-hidden overflow-ellipsis text-nowrap text-sm text-slate-200">
          <span>{song.artist}</span>
          {song.artist && song.album && <span> | </span>}
          <span>{song.album}</span>
        </div>
      </div>
      <div className="mr-3 ms-auto">
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MdMoreVert
                size={20}
                className="cursor-pointer text-gray-400 hover:text-gray-500"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <MdOutlineModeEditOutline className="mr-1" size={20} />
                <Link to={`songs/edit/${song.id}`}>Edit</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <MdDeleteOutline />
                <AlertDialogTrigger>Delete</AlertDialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete(song.id)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default SongItem;
