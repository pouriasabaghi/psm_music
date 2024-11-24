import http from "@/utils/http";

export const search = async (keyword, signal) => {
  const response = await http.get(`/api/search?keyword=${keyword}`, {
    signal,
  });

  return response.data;
};
