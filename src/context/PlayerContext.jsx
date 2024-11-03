import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { useQuery } from "@tanstack/react-query";
import { getSongs } from "@/services/apiSongs";

const PlayerContext = createContext(null);

function PlayerContextProvider({ children }) {
/*************  ✨ Codeium Command ⭐  *************/
  /**
   * PlayerContextProvider
   *
   * Provides the player context to components that need to access the player
   * state and functions.
   *
   * @param {object} props The component props
   * @param {ReactNode} props.children The children components
   *
   * @returns {ReactElement} The player context provider component
   */
/******  8169eee3-fb38-4d53-8b1c-99b8a28f974b  *******/  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [progress, setProgress] = useState(0);
  const [audio, setAudio] = useState(null);

  // This data has already been fetched and cached
  const { data: songs = [] } = useQuery({
    queryKey: ["songs"],
    queryFn: () => getSongs(),
  });

  const play = useCallback(
    async (song = null) => {
      const songToPlay = song || currentSong;

      if (!songToPlay || !songToPlay.path) {
        console.error("No song available to play.");
        return;
      }

      // Pause and replace the previous audio instance if it exists
      if (audio) {
        audio.pause();
      }

      const newAudio = new Audio(
        `http://localhost:8000/api/songs/${songToPlay.id}/stream`
      );

      newAudio.play();
      setAudio(newAudio);

      // Update the current index when playing a new song
      const newIndex = songs.findIndex((s) => s.id === songToPlay.id);

      setIsPlaying(true);
      setCurrentSong(songToPlay);
      setCurrentIndex(newIndex !== -1 ? newIndex : null);
    },
    [currentSong, songs, audio]
  );

  const continues = useCallback(() => {
    if (audio) {
      audio.play();
      setIsPlaying(true);
    }
  }, [audio]);

  const playOrContinues = useCallback(() => {
    if (audio) {
      continues();
    } else {
      play();
    }
  }, [play, continues, audio]);

  const stop = useCallback(() => {
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  }, [audio]);

  const next = useCallback(() => {
    if (currentIndex !== null && currentIndex + 1 < songs.length) {
      const nextIndex = currentIndex + 1;
      setCurrentSong(songs[nextIndex]);
      setCurrentIndex(nextIndex);
      play(songs[nextIndex]);
    } else {
      play(songs[0]);
    }
  }, [currentIndex, songs, play]);

  const prev = useCallback(() => {
    if (currentIndex !== null && currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentSong(songs[prevIndex]);
      setCurrentIndex(prevIndex);
      play(songs[prevIndex]);
    }
  }, [currentIndex, songs, play]);

  useEffect(() => {
    if (audio) {
      audio.addEventListener("ended", next);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("ended", next);
      }
    };
  }, [audio, next]);

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

  const value = {
    currentSong,
    isPlaying,
    setCurrentSong,
    play,
    continues,
    stop,
    next,
    prev,
    playOrContinues,
    progress,
    audio,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
}

function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined)
    throw new Error("PlayerContext was used outside of PlayerContext");
  return context;
}

export { PlayerContextProvider, usePlayer };
