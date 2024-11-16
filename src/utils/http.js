import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log(API_BASE_URL);

export const upload = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  withXSRFToken: true,
});



export default axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
  withXSRFToken: true,
});
