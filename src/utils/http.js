import axios from "axios";

export const upload = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  withXSRFToken: true,
});



export default axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
  withXSRFToken: true,
});
