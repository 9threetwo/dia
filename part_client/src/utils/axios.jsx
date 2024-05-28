import axios from "axios";
import {
  getTokenFromLocalStorage,
  getUserFromLocalStorage,
} from "./localStorage";

const customFetch = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/`,
});

customFetch.interceptors.request.use((config) => {
  const token = getTokenFromLocalStorage();
  const user = getUserFromLocalStorage();
  if (user) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export default customFetch;
