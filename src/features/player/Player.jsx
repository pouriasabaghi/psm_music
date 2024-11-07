import { usePlayer } from "@/context/PlayerContext";
import { useEffect } from "react";
import {
  MdPause,
  MdPlayArrow,
  MdRepeat,
  MdRepeatOne,
  MdShuffle,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";

import headphoneImg from "./../../assets/img/headphone.png";
import { formatTime } from "@/utils/utli";
import FavoriteButton from "../favorites/FavoriteButton";
import { useProgress } from "@/context/ProgressContext";
import LinearSlider from "./LinearSlider";

function Player({ song }) {
  const {
    next,
    prev,
    playOrContinues,
    isPlaying,
    stop,
    currentSong,
    audio,
    mode,
    dispatch,
  } = usePlayer();



  const songToPlay = currentSong || song;

  useEffect(() => {
    if (!currentSong) dispatch({ type: "song/current", payload: song });
  }, [song, currentSong, dispatch]);



  return (
    <div>
      <div
        className={`mx-auto mb-5 flex h-72 w-72 items-center justify-center rounded-2xl`}
      >
        <img
          className="h-64 w-64 rounded-2xl object-cover"
          src={songToPlay.cover || headphoneImg}
          alt={songToPlay.name}
        />
      </div>
      <h6 className="max-w-72 overflow-hidden overflow-ellipsis text-nowrap font-bold">
        {songToPlay.name}
      </h6>
      <span className="mb-14 mt-1 block h-6 max-w-72 overflow-hidden overflow-ellipsis text-nowrap text-slate-200">
        {songToPlay.artist}
      </span>

      <LinearSlider song={songToPlay} />

      <div className="mt-9 flex items-center justify-between px-6">
        <div>
          {mode === 0 && (
            <MdRepeat
              onClick={() => dispatch({ type: "song/mode", payload: 1 })}
              size={30}
              className="cursor-pointer text-white"
            />
          )}
          {mode === 1 && (
            <MdRepeatOne
              onClick={() => dispatch({ type: "song/mode", payload: 2 })}
              size={30}
              className="cursor-pointer text-white"
            />
          )}
          {mode === 2 && (
            <MdShuffle
              onClick={() => dispatch({ type: "song/mode", payload: 0 })}
              size={30}
              className="cursor-pointer text-white"
            />
          )}
        </div>

        <div className="flex items-center justify-center gap-4">
          <MdSkipPrevious
            onClick={() => prev()}
            size={40}
            className="cursor-pointer text-white"
          />
          {isPlaying ? (
            <MdPause
              onClick={() => stop()}
              size={40}
              className="cursor-pointer text-white"
            />
          ) : (
            <MdPlayArrow
              onClick={() => playOrContinues()}
              size={40}
              className="cursor-pointer text-white"
            />
          )}
          <MdSkipNext
            onClick={() => next(true)}
            size={40}
            className="cursor-pointer text-white"
          />
        </div>

        <FavoriteButton key={songToPlay.id} song={songToPlay} />
      </div>
    </div>
  );
}

export default Player;
