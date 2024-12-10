import { createContext, useContext, useMemo, useReducer } from "react";

import { useQuery } from "@tanstack/react-query";
import { getSongs } from "@/services/apiSongs";
import { getFavorites } from "@/services/apiFavorites";
import { getPlaylistSongsById } from "@/services/apiPlaylists";

const PlayerContext = createContext(null);

const initialState = {
  currentSong: null,
  currentIndex: 0,
  list: "songs",
  audio: null,
  // mode: JSON.parse(localStorage.getItem("mode")) || 0,
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
        currentSong: action.payload.currentSong,
        currentIndex: action.payload.currentIndex,
        audio: action.payload.audio,
      };

    case "song/continue":
      return {
        ...state,
      };

    case "song/stop":
      return {
        ...state,
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

    case "song/current":
      return {
        ...state,
        currentSong: action.payload,
      };

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function PlayerContextProvider({ children }) {
  const [{ currentSong, currentIndex, audio, list, isLoading }, dispatch] =
    useReducer(reducer, initialState);

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

  const value = useMemo(
    () => ({
      currentSong,
      dispatch,
      audio,
      list,
      isLoading,
      currentIndex,
      songs,
    }),
    [audio, currentSong, list, isLoading, currentIndex, songs],
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
