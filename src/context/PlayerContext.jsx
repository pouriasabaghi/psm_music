import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

import { useQueryClient } from "@tanstack/react-query";

const PlayerContext = createContext(null);

function PlayerContextProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const audioRef = useRef(null);

  const queryClient = useQueryClient();

  const play = useCallback(
    (song = null) => {
      const songToPlay = song || currentSong;

      if (!songToPlay || !songToPlay.path) {
        console.error("No song available to play.");
        return;
      }

      if (audioRef.current) {
        audioRef.current.pause();
      }

      const audio = new Audio(
        `http://localhost:8000/storage/${songToPlay.path}`,
      );

      audio.play();
      audioRef.current = audio;
      setIsPlaying(true);
      setCurrentSong(songToPlay);

      // Update the current index when playing a new song
      const cachedSongs = queryClient.getQueryData(["songs"]);
      const newIndex = cachedSongs.findIndex((s) => s.id === songToPlay.id);
      setCurrentIndex(newIndex !== -1 ? newIndex : null);
    },
    [currentSong, queryClient],
  );

  const continues = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const next = useCallback(() => {
    const songs = queryClient.getQueryData(["songs"]);
    if (currentIndex !== null && currentIndex + 1 < songs.length) {
      const nextIndex = currentIndex + 1;
      setCurrentSong(songs[nextIndex]);
      setCurrentIndex(nextIndex);
      play(songs[nextIndex]);
    }
  }, [currentIndex, queryClient, play]);

  const prev = useCallback(() => {
    const songs = queryClient.getQueryData(["songs"]);
    if (currentIndex !== null && currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentSong(songs[prevIndex]);
      setCurrentIndex(prevIndex);
      play(songs[prevIndex]);
    }
  }, [currentIndex, queryClient, play]);

  const value = {
    currentSong,
    isPlaying,
    setCurrentSong,
    play,
    continues,
    stop,
    next,
    prev,
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
