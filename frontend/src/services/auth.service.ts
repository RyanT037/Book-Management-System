import { apiClient } from './api';
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
} from '../types/auth.types';
// Service object that encapsulates all authentication-related API calls, such as login, registration, and logout.
export const authService = {
  login(credentials: LoginCredentials) {
    return apiClient
      .post<AuthResponse>('/auth/login', credentials)
      .then((response) => response.data);
  },
// Handles user registration by sending credentials to the API and returning the authentication response.
  register(credentials: RegisterCredentials) {
    return apiClient
      .post<AuthResponse>('/auth/register', credentials)
      .then((response) => response.data);
  },
// Handles user logout by calling the API endpoint to invalidate the session on the server side.
  logout() {
    return apiClient.post('/auth/logout').then((response) => response.data);
  },
};
