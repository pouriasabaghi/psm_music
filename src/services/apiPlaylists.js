import http from "@/utils/http";

export const createPlayList = async (name) => {
  const response = await http.post("/api/playlists", { name });
  return response.data;
};

export const getPlayLists = async () => {
  const response = await http.get("/api/playlists");
  return response.data;
};

export const addSongToPlaylist = async (playlistId, songId) => {
  const response = await http.post(`/api/playlists/${playlistId}/songs`, {
    song_id: songId,
  });
  return response.data;
};
