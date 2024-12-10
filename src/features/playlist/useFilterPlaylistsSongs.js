import { API_BASE_URL } from "@/utils/http";
import { useEffect, useState } from "react";



/**
 * Filter songs based on offline status and whether songs are cached locally.
 *
 * If offline, only return songs that have their audio cached locally.
 * If online, return all songs.
 *
 * @param {{ isOffline: boolean, isLoading: boolean, songsOnCloud: Song[] }}
 * @returns {{ songs: [] }}
 */
export function useFilterPlaylistsSongs({
  isOffline,
  isLoading,
  songsOnCloud,
}) {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const filterSongs = async () => {
      if (isOffline) {
        // open cache
        const audioCache = await caches.open("audio-cache");
        const audioCacheKeys = await audioCache.keys();

        // get cached audio stream
        const cachedAudio = audioCacheKeys.map((request) => request.url);
        const availableSongsInCache = songsOnCloud.filter((song) =>
          cachedAudio.includes(`${API_BASE_URL}/api/songs/${song.id}/stream`),
        );

        setSongs(availableSongsInCache);
      } else {
        !isLoading && setSongs(songsOnCloud);
      }
    };
    filterSongs();
  }, [isOffline, songsOnCloud, isLoading]);

  return { songs };
}
