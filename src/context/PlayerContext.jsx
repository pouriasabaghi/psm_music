import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useQuery } from "@tanstack/react-query";
import { getSongs } from "@/services/apiSongs";
import { useNavigate } from "react-router-dom";
import { getFavorites } from "@/services/apiFavorites";

const PlayerContext = createContext(null);

function PlayerContextProvider({ children }) {
  const navigate = useNavigate();

  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [progress, setProgress] = useState(0);
  const [audio, setAudio] = useState(null);
  const [mode, setMode] = useState(0);
  const [list, setList] = useState("songs");

  // This data has already been fetched and cached
  const { data: songs = [] } = useQuery({
    queryKey: [list],
    queryFn: () => {
      if (list === "favorites") {
        return getFavorites();
      }
      if (list === "songs") {
        return getSongs();
      }
    },
    refetchOnMount: true,
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
        `http://localhost:8000/api/songs/${songToPlay.id}/stream`,
      );

      newAudio.play();
      setAudio(newAudio);

      // Update the current index when playing a new song
      const newIndex = songs.findIndex((s) => s.id === songToPlay.id);

      setIsPlaying(true);
      setCurrentSong(songToPlay);
      setCurrentIndex(newIndex !== -1 ? newIndex : null);
    },
    [currentSong, songs, audio],
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

  const next = useCallback(
    (navigateToNextSong = false) => {
      if (currentIndex !== null && currentIndex + 1 < songs.length) {
        let nextIndex;

        // repeat
        if (mode === 0) {
          nextIndex = currentIndex + 1;
        }

        // repeatOne
        if (mode === 1) {
          nextIndex = currentIndex;
        }

        // shuffle
        if (mode === 2) {
          nextIndex = Math.floor(Math.random() * songs.length);
        }

        setCurrentSong(songs[nextIndex]);
        setCurrentIndex(nextIndex);
        play(songs[nextIndex]);
        if (navigateToNextSong) {
          navigate(`/songs/${songs[nextIndex].id}`);
        }
      } else {
        play(songs[0]);
        if (navigateToNextSong) {
          navigate(`/songs/${songs[0].id}`);
        }
      }
    },
    [currentIndex, songs, play, mode, navigate],
  );

  const prev = useCallback(() => {
    if (currentIndex !== null && currentIndex > 0 && audio.currentTime < 10) {
      const prevIndex = currentIndex - 1;
      setCurrentSong(songs[prevIndex]);
      setCurrentIndex(prevIndex);
      play(songs[prevIndex]);
      navigate(`/songs/${songs[prevIndex].id}`);
    } else {
      play(songs[currentIndex]);
    }
  }, [currentIndex, songs, play, navigate, audio]);

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

  const value = useMemo(
    () => ({
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
      mode,
      setMode,
      list,
      setList,
    }),
    [
      audio,
      continues,
      currentSong,
      isPlaying,
      mode,
      next,
      play,
      playOrContinues,
      prev,
      progress,
      stop,
      list,
    ],
  );

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
