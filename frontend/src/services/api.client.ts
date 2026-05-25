import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

const TOKEN_KEY = 'access_token';
const USER_KEY = 'user';

let logoutCallback: (() => void) | null = null;

/**
 * Create and configure the API client with interceptors
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '',
});

/**
 * Initialize the logout callback for the 401 response interceptor
 * Call this in your AuthProvider to enable automatic logout on 401 errors
 */
export function initializeApiInterceptors(logout: () => void) {
  logoutCallback = logout;
}

/**
 * Request interceptor: Add Authorization header with Bearer token
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * Response interceptor: Handle 401 Unauthorized errors
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth data from localStorage
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);

      // Call logout callback if available
      if (logoutCallback) {
        logoutCallback();
      } else {
        // Fallback: reload page if logout callback not initialized
        window.location.href = '/';
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
