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

const PlayerContext = createContext(null);

const initialState = {
  isPlaying: false,
  currentSong: null,
  currentIndex: 0,
  progress: 0,
  list: "songs",
  audio: null,
  mode: 0,
};

function reducer(state, action) {
  switch (action.type) {
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
    { currentSong, isPlaying, currentIndex, progress, audio, mode, list },
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

      if(typeof Number(list) === "number") {
        return getPlaylistSongsById(list);
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
      if (audio) audio.pause();

      const newAudio = new Audio(
        `http://localhost:8000/api/songs/${songToPlay.id}/stream`,
      );

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
      console.log(songs)
      
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
        console.log(songToNavigate);
      }
      if (navigateToNextSong) {
        navigate(`/songs/${songToNavigate.id}`);
      }
    },
    [currentIndex, songs, play, mode, navigate],
  );

  const prev = useCallback(() => {
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
      navigate(`/songs/${songs[prevIndex].id}`);
    } else {
      play(songs[currentIndex]);
    }
  }, [currentIndex, songs, play, navigate, audio]);

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
