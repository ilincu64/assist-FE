import axios from "axios";
import { useTokenStore } from "../store/tokenStore";

export const BACKEND_API_URL =
  "http://internship2024-backend-green.dev.assist.ro/api";

const api = axios.create({
  baseURL: BACKEND_API_URL,
});

api.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token") ? localStorage.getItem("token") : sessionStorage.getItem("token")}`;

  return config;
});

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      useTokenStore.getState().removeToken();
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
    }
    return Promise.reject(error);
  },
);

export const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default api;
