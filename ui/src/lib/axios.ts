import { useAuthStore } from "@/stores/authStore";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: process.env.BASE_URL || "http://localhost:5173/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post(
          "/auth/refresh",
          {},
          { withCredentials: true },
        );
        const accessToken = data.accessToken;
        const decodedToken = jwtDecode<{ exp: number }>(accessToken);
        const expirationTimeInMs = decodedToken.exp * 1000;

        useAuthStore
          .getState()
          .setAuthData(data.accessToken, expirationTimeInMs);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (_) {
        useAuthStore.getState().logout();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
