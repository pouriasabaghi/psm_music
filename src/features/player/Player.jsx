import { usePlayer } from "@/context/PlayerContext";
import { Slider } from "@/ui/slider";
import { useEffect } from "react";
import {
  MdPause,
  MdPlayArrow,
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
  } = usePlayer();

  useEffect(() => {
    if (!currentSong) setCurrentSong(song);
  }, [song, currentSong, setCurrentSong]);

  function handleTimeChange(value) {
    audio.currentTime = (value[0] * audio.duration) / 100;
  }

  return (
    <div>
       <div className="bg-dark-50 w-72 h-72 mx-auto rounded-2xl mb-5">
          <img className="w-64 h-64 object-cover mx-auto" src={headphoneImg} alt={song.name} />
        </div>
        <h6 className="font-bold mb-5">{song.name}</h6>

      <Slider className="cursor-pointer" value={[progress]} onValueChange={handleTimeChange} max={100} step={1} />

      <div className="flex items-center justify-center gap-4 mt-4">
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
    </div>
  );
}

export default Player;
