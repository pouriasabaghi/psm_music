import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { useQuery } from "@tanstack/react-query";
import { getSongs } from "../services/apiSongs";

const PlayerContext = createContext(null);

function PlayerContextProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const audioRef = useRef(null);

  // This data has already been fetched and cached
  const { data: songs = [] } = useQuery({
    queryKey: ["songs"],
    queryFn: () => getSongs(),
  });

  const play = useCallback(
    (song = null) => {
      const songToPlay = song || currentSong;

      if (!songToPlay || !songToPlay.path) {
        console.error("No song available to play.");
        return;
      }

      // Prevent multi audio play at same time;
      if (audioRef.current) {
        audioRef.current.pause();
      }

      const audio = new Audio(
        `http://localhost:8000/storage/${songToPlay.path}`,
      );

      audio.play();
      audio.currentTime = 20;
      audioRef.current = audio;
      
      // Update the current index when playing a new song
      const newIndex = songs.findIndex((s) => s.id === songToPlay.id);
      
      setIsPlaying(true);
      setCurrentSong(songToPlay);
      setCurrentIndex(newIndex !== -1 ? newIndex : null);
    },
    [currentSong, songs],
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
    if (currentIndex !== null && currentIndex + 1 < songs.length) {
      const nextIndex = currentIndex + 1;
      setCurrentSong(songs[nextIndex]);
      setCurrentIndex(nextIndex);
      play(songs[nextIndex]);
    }else{
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
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("ended", next);
    }
    
    return () => {
      if (audio) {
        audio.removeEventListener("ended", next);
      }
    };
  }, [next]);

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

