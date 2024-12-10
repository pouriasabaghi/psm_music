import { createContext, useState, useEffect, useContext } from "react";
import { usePlayer } from "./PlayerContext";
import { usePlayerController } from "./PlayerControllerContext";

const ProgressContext = createContext(0);

function ProgressContextProvider({ children }) {
  const [progress, setProgress] = useState(0);
  const { audio } = usePlayer();
  const { isPlaying } = usePlayerController();
  useEffect(() => {
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (!isPlaying) return;

      const percentage = (audio.currentTime / audio.duration) * 100;
      setProgress(percentage);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audio, isPlaying]);

  return (
    <ProgressContext.Provider value={progress}>
      {children}
    </ProgressContext.Provider>
  );
}

const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined)
    throw new Error(
      "ProgressContext was used outside of ProgressContextProvider",
    );

  return context;
};

export { ProgressContextProvider, useProgress };
