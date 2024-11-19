import http from "@/utils/http";

export const toggleFollow = async (playlistId) => {
  if (!playlistId) return;
  const response = await http.post(`/api/playlists/${playlistId}/follow`);
  return response.data;
};

export const isFollowing = async (playlistId) => {
  const response = await http.get(`/api/playlists/${playlistId}/is-following`);
  return response.data;
};

export const followedPlaylists = async () => {
  const response = await http.get("/api/playlists/follow");
  return response.data;
};
