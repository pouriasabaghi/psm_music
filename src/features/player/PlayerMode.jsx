import { usePlayer } from "@/context/PlayerContext";
import { MdRepeat, MdRepeatOne, MdShuffle } from "react-icons/md";

function PlayerMode({size=30}) {
  const {
    mode,
    dispatch,
  } = usePlayer();

  function handleModeChange(mode) {
    dispatch({ type: "song/mode", payload: mode });
    localStorage.setItem("mode", mode);
  }
  return (
    <div>
      {mode === 0 && (
        <MdRepeat
          onClick={() => handleModeChange(1)}
          size={size}
          className="cursor-pointer text-white"
        />
      )}
      {mode === 1 && (
        <MdRepeatOne
          onClick={() => handleModeChange(2)}
          size={size}
          className="cursor-pointer text-white"
        />
      )}
      {mode === 2 && (
        <MdShuffle
          onClick={() => handleModeChange(0)}
          size={size}
          className="cursor-pointer text-white"
        />
      )}
    </div>
  );
}

export default PlayerMode;
