import http from "@/utils/http";

export const createPlayList = async (name) => {
  const response = await http.post("/api/playlists", { name });
  return response.data;
};

export const getPlayLists = async () => {
  const response = await http.get("/api/playlists");
  return response.data;
};

export const getPlaylist = async (playlistId) => {
  const response = await http.get(`/api/playlists/${playlistId}`);
  return response.data;
};

export const getPlaylistSongsById = async (id) => {
  if (!id) return;

  const response = await http.get(`/api/playlists/${id}/songs`);
  return response.data;
};

export const deletePlaylist = async (id) => {
  if (!id) return;

  const response = await http.delete(`/api/playlists/${id}`);
  return response.data;
};

export const updatePlaylist = async (id, data) => {
  if (!id) return;

  const response = await http.put(`/api/playlists/${id}`, data);
  return response.data;
};

export const addSongToPlaylist = async (playlistId, songId) => {
  const response = await http.post(`/api/playlists/${playlistId}/songs`, {
    song_id: songId,
  });
  return response.data;
};

export const removeFromPlaylist = async (playlistId, songId) => {
  const response = await http.delete(
    `/api/playlists/${playlistId}/songs/${songId}`,
  );
  return response.data;
};

export const getTopPlaylists = async () => {
  const response = await http.get(`/api/playlists/top-playlists`);
  return response.data;
};
