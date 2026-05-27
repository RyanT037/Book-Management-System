// Defines the possible roles a user can have within the system
export type Role = 'USER' | 'ADMIN';

// Interface representing the structure of a User object
export interface User {
  id: number;
  email: string;
  name: string;
  username: string;
  role: Role;
  createdAt: string;
}

// Credentials required for a user to log in
export interface LoginCredentials {
  email: string;
  password: string;
}

// Credentials required for a user to register a new account
export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
  username: string;
}

// Structure of the response received after successful authentication
export interface AuthResponse {
  access_token: string;
  user?: User;
}

// Shape of the authentication context used throughout the application
export interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (token: string, user: User | null) => void;
  logout: () => void;
  updateUser: (updatedUser: User) => void;
}
