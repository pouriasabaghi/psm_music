import {
  MdDeleteOutline,
  MdMoreVert,
  MdOutlineModeEditOutline,
  MdQueueMusic,
  MdShare,
} from "react-icons/md";
import { usePlayer } from "../../context/PlayerContext";
import headphoneImg from "./../../assets/img/headphone.webp";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import AddSongToPlaylist from "../playlist/AddSongToPlaylist";
import { copyToClipboard } from "@/utils/utli";
import { memo, useRef, useState } from "react";

function SongItem({ song, play, stop }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { deleteSong } = useDeleteSong();

  const { currentSong, dispatch } = usePlayer();

  const [isLongPress, setIsLongPress] = useState(false);
  const timerRef = useRef(null);

  const editLink = `/songs/edit/${song.id}`;
  const shareLink = `${window.location.origin}/songs/${song.id}`;

  const handleLongPress = () => {
    // detecting long press
    setIsLongPress(true);

    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    navigate(`/songs-bulk-actions?from=${location.pathname}`);
  };

  const handleMouseDown = () => {
    setIsLongPress(false);
    timerRef.current = setTimeout(handleLongPress, 1000);
  };

  const handleMouseUp = () => {
    // clear timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleTouchStart = () => {
    setIsLongPress(false);
    timerRef.current = setTimeout(handleLongPress, 1000);
  };

  const handleTouchEnd = () => {
    // clear timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  function handlePlayer() {
    if (isLongPress) return;

    // prevent resets song if song is already playing
    if (song.id !== currentSong?.id) {
      play(song);
    } else {
      navigate(`/songs/${song.id}`);
    }
  }

  function handleDelete(id) {
    if (currentSong?.id === id) {
      stop();
      dispatch({ type: "song/current", payload: null });
    }
    deleteSong(id);
  }
  return (
    <div
      className="flex cursor-pointer items-center gap-x-3"
      role="listitem"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // cancel if mouse leaved
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onScroll={handleMouseUp}
    >
      <img
        onClick={handlePlayer}
        className="h-16 w-16 rounded-lg object-cover"
        width={64}
        height={64}
        src={song.cover || headphoneImg}
        alt={song.name}
      />
      <div onClick={handlePlayer} className="flex w-full flex-col gap-y-1">
        <span
          className={`max-w-52 overflow-hidden overflow-ellipsis text-nowrap ${currentSong?.id === song.id ? "text-purple-500" : "text-white"}`}
        >
          {song.name}
        </span>
        <div className="min-h-4 max-w-52 overflow-hidden overflow-ellipsis text-nowrap text-sm text-slate-200">
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
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => copyToClipboard(shareLink)}
              >
                <MdShare className="mr-1" size={20} />
                <span>Share</span>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <MdOutlineModeEditOutline className="mr-1" size={20} />
                <Link to={editLink}>Edit</Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer">
                <MdDeleteOutline />
                <AlertDialogTrigger>Delete</AlertDialogTrigger>
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer">
                <MdQueueMusic />
                <AddSongToPlaylist
                  song={song}
                  trigger={<span>Add to playlist</span>}
                />
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

export default memo(SongItem);
