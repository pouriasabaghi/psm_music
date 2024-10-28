import http from "../utils/http";

export const getSongs = async () => {
    const response = await http.get("/api/songs");
    return response.data;
};