import http from "@/utils/http";

export const toggleFavorite = async (id) => {
  if (!id) return;
  const response = await http.post(`/api/songs/${id}/favorites`);
  return response.data;
};

export const getFavorites = async () => {
  const response = await http.get("/api/favorites");
  return response.data;
};
