import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/auth.service';
import type {
  LoginCredentials,
  RegisterCredentials,
} from '../types/auth.types';

export function useAuthActions() {
  const { setAuth, logout } = useAuth();
  const navigate = useNavigate();

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      const { access_token, user } = await authService.login(credentials);
      setAuth(access_token, user ?? null);
      toast.success('Logged in successfully');
      navigate('/dashboard');
    },
    [setAuth, navigate],
  );

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
