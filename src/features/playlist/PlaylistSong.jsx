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
import { Link, useNavigate, useParams } from "react-router-dom";
import useRemoveFromPlaylist from "./useRemoveFromPlaylist";

function PlaylistSong({ song }) {
  const { id: playlistId } = useParams();
  const navigate = useNavigate();
  const { removeFromPlaylist, isPending } = useRemoveFromPlaylist();
  const { currentSong, play } = usePlayer();

  function handlePlayer() {
    // prevent resets song if song is already playing
    if (song.id !== currentSong?.id) {
      play(song);
    } else {
      navigate(`/songs/${song.id}`);
    }
  }

  function handleRemove(songId) {
    removeFromPlaylist({ playlistId, songId });
  }
  return (
    <div className="flex cursor-pointer items-center gap-x-3" role="listitem">
      <img
        onClick={handlePlayer}
        className="h-16 w-16 rounded-lg object-cover"
        width={64}
        height={64}
        src={song.cover || headphoneImg}
        alt={song.name}
      />
      <div onClick={handlePlayer} className="flex flex-col gap-y-1">
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
              <Link to={`/songs/edit/${song.id}`}>Edit</Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              disabled={isPending}
              onClick={() => handleRemove(song.id)}
              className="cursor-pointer"
            >
              <MdDeleteOutline className="mr-1" size={20} />
              <span>Remove from playlist</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default PlaylistSong;
