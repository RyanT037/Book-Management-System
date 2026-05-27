import { apiClient } from './api';
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
} from '../types/auth.types';

export const authService = {
  login(credentials: LoginCredentials) {
    return apiClient
      .post<AuthResponse>('/auth/login', credentials)
      .then((response) => response.data);
  },

  register(credentials: RegisterCredentials) {
    return apiClient
      .post<AuthResponse>('/auth/register', credentials)
      .then((response) => response.data);
  },

  logout() {
    return apiClient.post('/auth/logout').then((response) => response.data);
  },
};
