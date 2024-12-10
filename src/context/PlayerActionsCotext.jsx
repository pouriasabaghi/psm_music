import { createContext, useContext, useEffect } from "react";
import { usePlayerController } from "./PlayerControllerContext";
import { useLocation, useNavigate } from "react-router-dom";
import { usePlayer } from "./PlayerContext";

const PlayerActionsContext = createContext(null);

function PlayerActionsContextProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { next, prev, stop, continues } = usePlayerController();

  const { audio, dispatch, currentSong } = usePlayer();

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

  return (
    <PlayerActionsContext.Provider value={true}>
      {children}
    </PlayerActionsContext.Provider>
  );
}

function usePlayerActions() {
  const context = useContext(PlayerActionsContext);
  if (!context)
    throw new Error(
      "usePlayerActions must be used within PlayerActionsContextProvider",
    );
  return context;
}

export { PlayerActionsContextProvider, usePlayerActions };
