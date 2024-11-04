import { usePlayer } from "@/context/PlayerContext";
import { Slider } from "@/ui/slider";
import { useEffect } from "react";
import {
  MdFavorite,
  MdFavoriteBorder,
  MdHeartBroken,
  MdOutlineModeEditOutline,
  MdPause,
  MdPlayArrow,
  MdRepeat,
  MdRepeatOne,
  MdShuffle,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";

import headphoneImg from "./../../assets/img/headphone.png";

function Player({ song }) {
  const {
    next,
    prev,
    playOrContinues,
    isPlaying,
    stop,
    currentSong,
    setCurrentSong,
    audio,
    progress,
    mode,
    setMode,
  } = usePlayer();

  const songToPlay = currentSong || song

  useEffect(() => {
    if (!currentSong) setCurrentSong(song);
  }, [song, currentSong, setCurrentSong]);

  function handleTimeChange(value) {
    audio.currentTime = (value[0] * audio.duration) / 100;
  }

  return (
    <div>
      <div className="mx-auto mb-5 h-72 w-72 rounded-2xl bg-dark-50">
        <img
          className="mx-auto h-64 w-64 object-cover"
          src={headphoneImg}
          alt={songToPlay.name}
        />
      </div>
      <h6 className="mb-14 font-bold">{songToPlay.name}</h6>

      <Slider
        className="cursor-pointer"
        value={[progress]}
        onValueChange={handleTimeChange}
        max={100}
        step={1}
      />

      <div className="mt-9 flex items-center justify-between px-6">
        <div>
          {mode === 0 && (
            <MdRepeat
              onClick={() => setMode(1)}
              size={30}
              className="cursor-pointer text-white"
            />
          )}
          {mode === 1 && (
            <MdRepeatOne
              onClick={() => setMode(2)}
              size={30}
              className="cursor-pointer text-white"
            />
          )}
          {mode === 2 && (
            <MdShuffle
              onClick={() => setMode(0)}
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
            onClick={() => next()}
            size={40}
            className="cursor-pointer text-white"
          />
        </div>

        <MdFavoriteBorder size={30} className="cursor-pointer text-white" />
      </div>
    </div>
  );
}

export default Player;
