import { useState, useEffect } from "react";
import { toast } from "sonner";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useOfflineSongs() {
  const [songs, setSongs] = useState([]);
  const [isPending, setIsPending] = useState(true); // is true on first mount

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsPending(true);
        // open caches
        const apiCache = await caches.open("api-cache");
        const audioCache = await caches.open("audio-cache");

        // get keys
        const apiCacheKeys = await apiCache.keys();
        const audioCacheKeys = await audioCache.keys();

        // get songs request
        const songRequests = apiCacheKeys.filter(
          (request) => request.url.replace(API_BASE_URL, "") === "/api/songs",
        )[0];

        // get cached audio stream
        const cachedAudio = audioCacheKeys.map((request) => request.url);

        // get response from cache
        const response = await apiCache.match(songRequests);

        if (response) {
          const data = await response?.json();

          // some songs are in api-cache but has not been downloaded as stream file
          const availableSongsInCache = data.filter((song) =>
            cachedAudio.includes(`${API_BASE_URL}/api/songs/${song.id}/stream`),
          );

          setSongs(availableSongsInCache);
        }

        setIsPending(false);
      } catch (error) {
        toast.error("Some thing went wrong, please reload application");
        console.error(error.message);
      }
    };
    fetch();
  }, []);

  return { songs, isPending };
}
