import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";

const TOKEN_KEY = "access_token";
// Create an Axios instance with a base URL from environment variables or default to localhost
export const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000",
});
// Initialize API interceptors to handle authentication token attachment and response error handling
export function initializeApiInterceptors(logout: () => void) {
  apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Attach the saved bearer token to every API request when available.
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
      }
      return config;
    },
    (error) => Promise.reject(error),
  );
// Intercept responses to handle 401 Unauthorized errors globally, which indicates an invalid or expired session.
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      // A 401 means the session is no longer valid, so clear local auth state.
      if (error.response?.status === 401) {
        localStorage.removeItem(TOKEN_KEY);
        logout();
      }
      return Promise.reject(error);
    },
  );
}
