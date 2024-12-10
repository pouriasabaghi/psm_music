import { usePlayer } from "@/context/PlayerContext";
import { useEffect } from "react";
import {
  MdPause,
  MdPlayArrow,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";

import headphoneImg from "./../../assets/img/headphone.webp";
import FavoriteButton from "../favorites/FavoriteButton";
import LinearSlider from "./LinearSlider";
import PlayerMode from "./PlayerMode";
import { usePlayerController } from "@/context/PlayerControllerContext";

function Player({ song }) {
  const { isPlaying, currentSong, dispatch } = usePlayer();

  const { next, prev, playOrContinues, stop } = usePlayerController();

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
        <PlayerMode />

        <div className="flex items-center justify-center gap-4">
          <MdSkipPrevious
            onClick={() => prev(true)}
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
