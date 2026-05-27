import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// External library for toast notifications
import toast from 'react-hot-toast';
// Custom hooks and services for authentication logic
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/auth.service';
// Type definitions for authentication credentials
import type {
  LoginCredentials,
  RegisterCredentials,
} from '../types/auth.types';

/**
 * Custom hook to handle authentication-related actions like login and registration.
 */
export function useAuthActions() {
  const { setAuth, logout } = useAuth();
  const navigate = useNavigate();

  // Handles user login, updates auth state, and redirects to dashboard
  const login = useCallback(
    async (credentials: LoginCredentials) => {
      const { access_token, user } = await authService.login(credentials);
      setAuth(access_token, user ?? null);
      toast.success('Logged in successfully');
      navigate('/dashboard');
    },
    [setAuth, navigate],
  );

  // Handles user registration, updates auth state, and redirects to dashboard
  const register = useCallback(
    async (credentials: RegisterCredentials) => {
      const { access_token, user } = await authService.register(credentials);
      setAuth(access_token, user ?? null);
      toast.success('Account created');
      navigate('/dashboard');
    },
    [setAuth, navigate],
  );

  return { login, register, logout };
}
