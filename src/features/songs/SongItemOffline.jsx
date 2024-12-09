import { MdMoreVert, MdShare } from "react-icons/md";
import { usePlayer } from "../../context/PlayerContext";
import headphoneImg from "./../../assets/img/headphone.webp";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

import { copyToClipboard } from "@/utils/utli";
import { toast } from "sonner";

function SongItemOffline({ song }) {
  const {  currentSong, play } = usePlayer();

  const shareLink = `${window.location.origin}/songs/${song.id}`;

  function handlePlayer() {
    // prevent resets song if song is already playing
    if (song.id !== currentSong?.id) {
      play(song);
    } else {
      toast.warning("Song detail is'nt not available in offline mode");
    }
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
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default SongItemOffline;
