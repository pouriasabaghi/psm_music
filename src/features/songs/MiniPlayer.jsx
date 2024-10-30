import { MdPlayArrow, MdPause, MdSkipNext } from "react-icons/md";
import headphoneImg from "./../../assets/img/headphone.png";
import { usePlayer } from "../../context/PlayerContext";
function MiniPlayer() {
  const player = usePlayer();

  if (!player.currentSong) return null;

  return (
    <div className="flex w-full rounded-3xl bg-dark-50 py-1 pe-5">
      <div
        className={`${player.isPlaying ? "" : "stop"} animate-spin-slow rounded-full bg-dark-200 shadow-[0_0_0_2px_#131319,_0_0_0_4px_#676789,_0_0_0_6px_#131319]`}
      >
        <img className="h-10 w-10" src={headphoneImg} alt="" />
      </div>
      <div className="flex flex-col ps-4">
        <span className="text-sm font-bold">{player.currentSong?.name}</span>
        <span className="text-xs">{player.currentSong?.artist}</span>
      </div>

      <div className="ms-auto flex items-center gap-4">
        <div className="flex items-center justify-center">
          <svg
            className="absolute cursor-pointer text-white"
            width="25"
            height="25"
          >
            <circle
              cx="12.5"
              cy="12.5"
              r="11.5"
              stroke="gray"
              strokeWidth="1"
              fill="none"
            />
            <circle
              cx="12.5"
              cy="12.5"
              r="10.5"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              strokeDasharray="100 100"
              strokeDashoffset="30"
            />
          </svg>
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
        <MdSkipNext onClick={()=>player.next()} size={20} className="cursor-pointer text-white" />
      </div>
    </div>
  );
}

export default MiniPlayer;
