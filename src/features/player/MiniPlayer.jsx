import {
  MdPlayArrow,
  MdPause,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";
import headphoneImg from "./../../assets/img/headphone.webp";
import { usePlayer } from "../../context/PlayerContext";
import { useNavigate } from "react-router-dom";
import CircleProgress from "./CircleProgress";
import { useNetworkStatus } from "@/context/NetworkStatusContext";
import { toast } from "sonner";
import PlayerMode from "./PlayerMode";
function MiniPlayer() {
  const { currentSong, isPlaying, continues, stop, next, isLoading, prev } =
    usePlayer();

  const isOffline = useNetworkStatus();

  const navigate = useNavigate();

  function handleClick() {
    if (!isOffline) navigate(`/songs/${currentSong.id}`);

    if (isOffline) toast.warning("Song detail is'nt available in offline mode");
  }

  if (!currentSong) return null;

  return (
    <div
      className={`flex w-full rounded-3xl bg-dark-50 py-1 pe-5 ps-1 ${isLoading ? "bg-glass-loader" : ""}`}
    >
      <div
        onClick={handleClick}
        className={`${isPlaying ? "" : "stop"} animate-spin-slow cursor-pointer overflow-hidden rounded-full bg-dark-200 shadow-[0_0_0_2px_#131319,_0_0_0_4px_#676789,_0_0_0_6px_#131319]`}
      >
        <img
          className="h-10 w-10 object-cover"
          src={currentSong.cover || headphoneImg}
          alt=""
        />
      </div>
      <div onClick={handleClick} className="flex cursor-pointer flex-col ps-4">
        <span className="max-w-44 overflow-hidden overflow-ellipsis text-nowrap text-sm font-bold">
          {currentSong?.name}
        </span>
        <span className="max-w-44 overflow-hidden overflow-ellipsis text-nowrap text-xs">
          {currentSong?.artist}
        </span>
      </div>

      <div className="ms-auto flex items-center gap-4">
        <PlayerMode size={20} />

        <MdSkipPrevious
          onClick={() => prev()}
          size={20}
          className="cursor-pointer text-white"
        />
        <div className="flex items-center justify-center">
          <CircleProgress />
          {isPlaying ? (
            <MdPause
              onClick={() => stop()}
              size={20}
              className="relative z-10 cursor-pointer text-white"
            />
          ) : (
            <MdPlayArrow
              onClick={() => continues()}
              size={20}
              className="relative z-10 cursor-pointer text-white"
            />
          )}
        </div>
        <MdSkipNext
          onClick={() => next()}
          size={20}
          className="cursor-pointer text-white"
        />
      </div>
    </div>
  );
}

export default MiniPlayer;
