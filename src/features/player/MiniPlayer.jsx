import { MdPlayArrow, MdPause, MdSkipNext } from "react-icons/md";
import headphoneImg from "./../../assets/img/headphone.png";
import { usePlayer } from "../../context/PlayerContext";
import ProgressSvg from "@/ui/ProgressSvg";
import { useNavigate } from "react-router-dom";
function MiniPlayer() {
  const player = usePlayer();
  const navigate = useNavigate();

  if (!player.currentSong) return null;

  return (
    <div className="flex w-full rounded-3xl bg-dark-50 py-1 pe-5">
      <div
        onClick={() => navigate(`/songs/${player.currentSong.id}`)}
        className={`${player.isPlaying ? "" : "stop"} animate-spin-slow cursor-pointer overflow-hidden rounded-full bg-dark-200 shadow-[0_0_0_2px_#131319,_0_0_0_4px_#676789,_0_0_0_6px_#131319]`}
      >
        <img className="h-10 w-10" src={player.currentSong.cover || headphoneImg} alt="" />
      </div>
      <div
        onClick={() => navigate(`/songs/${player.currentSong.id}`)}
        className="flex cursor-pointer flex-col ps-4"
      >
        <span className="max-w-52 overflow-hidden overflow-ellipsis text-nowrap text-sm font-bold">{player.currentSong?.name}</span>
        <span className="max-w-52 overflow-hidden overflow-ellipsis text-nowrap text-xs">{player.currentSong?.artist}</span>
      </div>

      <div className="ms-auto flex items-center gap-4">
        <div className="flex items-center justify-center">
          <ProgressSvg className="absolute" progress={player.progress} />

          {player.isPlaying ? (
            <MdPause
              onClick={() => player.stop()}
              size={20}
              className="relative z-10 cursor-pointer text-white"
            />
          ) : (
            <MdPlayArrow
              onClick={() => player.continues()}
              size={20}
              className="relative z-10 cursor-pointer text-white"
            />
          )}
        </div>
        <MdSkipNext
          onClick={() => player.next()}
          size={20}
          className="cursor-pointer text-white"
        />
      </div>
    </div>
  );
}

export default MiniPlayer;
