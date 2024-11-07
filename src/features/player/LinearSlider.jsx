import { usePlayer } from "@/context/PlayerContext";
import { useProgress } from "@/context/ProgressContext";
import { Slider } from "@/ui/slider";
import { formatTime } from "@/utils/utli";

function LinearSlider({song}) {
  const progress = useProgress();
  const { audio } = usePlayer();

  function handleTimeChange(value) {
    audio.currentTime = (value[0] * audio.duration) / 100;
  }

  return (
    <div className="">
      <Slider
        className="cursor-pointer"
        value={[progress]}
        onValueChange={handleTimeChange}
        max={100}
        step={1}
      />
      <div className="mt-3 flex items-center justify-between">
        <span>{formatTime(audio?.currentTime || 0)}</span>
        <span>{formatTime(song.duration)}</span>
      </div>
    </div>
  );
}

export default LinearSlider;
