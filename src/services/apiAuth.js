import http from "../utils/http";

export const login = async ({email, password}) => {
  if (!email || !password) return;

  await http.get("/sanctum/csrf-cookie");

  const response = await http.post("/login", { email, password });

  return response;
};

export const register = async ({email, password, name}) => {
  if (!email || !password) return;

  await http.get("/sanctum/csrf-cookie");

  const response = await http.post("/register", { email, password, name });

  return response;
};


export const getCurrentUser = async () => {
  const response = await http.get("/api/user");
  return response.data;
};
