import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

import { useQuery } from "@tanstack/react-query";
import { getSongs } from "@/services/apiSongs";
import { useLocation, useNavigate } from "react-router-dom";
import { getFavorites } from "@/services/apiFavorites";
import { getPlaylistSongsById } from "@/services/apiPlaylists";
import { API_BASE_URL } from "@/utils/http";
import { toast } from "sonner";

const PlayerContext = createContext(null);

const initialState = {
  isPlaying: false,
  currentSong: null,
  currentIndex: 0,
  list: "songs",
  audio: null,
  mode: JSON.parse(localStorage.getItem("mode")) || 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "song/loading":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "song/play":
      return {
        ...state,
        isPlaying: true,
        currentSong: action.payload.currentSong,
        currentIndex: action.payload.currentIndex,
        audio: action.payload.audio,
      };

    case "song/continue":
      return {
        ...state,
        isPlaying: true,
      };

    case "song/stop":
      return {
        ...state,
        isPlaying: false,
      };

    case "song/next":
      return {
        ...state,
        currentSong: action.payload.currentSong,
        currentIndex: action.payload.currentIndex,
      };

    case "song/prev":
      return {
        ...state,
        currentSong: action.payload.currentSong,
        currentIndex: action.payload.currentIndex,
      };

    case "song/list":
      return {
        ...state,
        list: action.payload,
      };

    case "song/playing":
      return {
        ...state,
        isPlaying: action.payload,
      };

    case "song/current":
      return {
        ...state,
        currentSong: action.payload,
      };

    case "song/mode":
      return {
        ...state,
        mode: action.payload,
      };

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function PlayerContextProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [
    { currentSong, isPlaying, currentIndex, audio, mode, list, isLoading },
    dispatch,
  ] = useReducer(reducer, initialState);

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

      if (typeof Number(list) === "number") {
        return getPlaylistSongsById(list);
      }
    },
    refetchOnMount: true,
    retry: (failureCount, error) => {
      if (error.status === 401) return 0;

      return failureCount < 3;
    },
  });

  const play = useCallback(
    async (song = null) => {
      try {
        const songToPlay = song || currentSong;

        if (!songToPlay || !songToPlay.path) {
          console.error("No song available to play.");
          return;
        }

        // Pause and replace the previous audio instance if it exists
        if (audio) {
          audio.pause();
          audio.src = "";
        }

        dispatch({ type: "song/loading", payload: true });

        const newAudio = new Audio(
          `${API_BASE_URL}/api/songs/${songToPlay.id}/stream`,
        );

        // Try to play the audio
        newAudio.play();

        // Update the current index when playing a new song
        const newIndex = songs.findIndex((s) => s.id === songToPlay.id);

        // Update the state
        dispatch({
          type: "song/play",
          payload: {
            currentSong: songToPlay,
            currentIndex: newIndex,
            audio: newAudio,
          },
        });
      } catch (error) {
        toast.error("Failed to play song.");
      }
    },
    [currentSong, songs, audio],
  );

  const continues = useCallback(() => {
    if (audio) {
      audio.play();
      dispatch({ type: "song/playing", payload: true });
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
      dispatch({ type: "song/playing", payload: false });
    }
  }, [audio]);

  const next = useCallback(
    (navigateToNextSong = false) => {
      let songToNavigate;

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

        dispatch({
          type: "song/next",
          payload: {
            currentSong: songs[nextIndex],
            currentIndex: nextIndex,
          },
        });

        play(songs[nextIndex]);

        songToNavigate = songs[nextIndex];
      } else {
        play(songs[0]);

        songToNavigate = songs[0];
      }

      if (navigateToNextSong) {
        navigate(`/songs/${songToNavigate.id}`, { replace: true });
      }
    },
    [currentIndex, songs, play, mode, navigate],
  );

  const prev = useCallback(
    (navigateToPrevSong = false) => {
      let songToNavigate;

      if (currentIndex !== null && currentIndex > 0 && audio.currentTime < 10) {
        const prevIndex = currentIndex - 1;
        dispatch({
          type: "song/prev",
          payload: {
            currentSong: songs[prevIndex],
            currentIndex: prevIndex,
          },
        });
        play(songs[prevIndex]);

        songToNavigate = `/songs/${songs[prevIndex].id}`;
      } else {        
        play(songs[currentIndex]);
        
        songToNavigate = songs[currentIndex];
      }

      if (navigateToPrevSong) {
        navigate(songToNavigate);
      }
    },
    [currentIndex, songs, play, navigate, audio],
  );

  // Automatically play next song
  useEffect(() => {
    // prevent navigation on index page
    const goToNextSong = () => next(location.pathname !== "/");

    if (audio) {
      audio.addEventListener("ended", goToNextSong);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("ended", goToNextSong);
      }
    };
  }, [audio, next, location]);

  // On audio start playing
  useEffect(() => {
    const setLoader = () => dispatch({ type: "song/loading", payload: false });
    if (audio) {
      audio.addEventListener("canplay", setLoader);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("canplay", setLoader);
      }
    };
  }, [audio, dispatch]);

  // Update mediaSession when a new song is played
  useEffect(() => {
    if (!currentSong) return;

    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentSong.title,
        artist: currentSong.artist,
        album: currentSong.album,
        artwork: [
          {
            src: currentSong.cover,
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: currentSong.cover,
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: currentSong.cover,
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: currentSong.cover,
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: currentSong.cover,
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: currentSong.cover,
            sizes: "512x512",
            type: "image/png",
          },
        ],
      });

      // Define actions for play, pause, next, prev
      navigator.mediaSession.setActionHandler("play", continues);
      navigator.mediaSession.setActionHandler("pause", stop);
      navigator.mediaSession.setActionHandler("nexttrack", () => next(false));
      navigator.mediaSession.setActionHandler("previoustrack", prev);
    }
  }, [continues, next, prev, stop, currentSong]);

  // Update document title
  useEffect(() => {
    if (!currentSong) return;
    document.title = currentSong.name;
  }, [currentSong]);

  const value = useMemo(
    () => ({
      currentSong,
      isPlaying,
      dispatch,
      play,
      continues,
      stop,
      next,
      prev,
      playOrContinues,
      audio,
      mode,
      list,
      isLoading,
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
      stop,
      list,
      isLoading,
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
