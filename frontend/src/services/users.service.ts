import { apiClient } from './api';

// Interface representing the structure of a User object from the backend
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
}

// Payload structure for creating a new user record
export interface CreateUserPayload {
  name: string;
  username: string;
  email: string;
  password: string;
  role: User['role'];
}

// Payload structure for updating an existing user record (all fields optional)
export interface UpdateUserPayload {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: User['role'];
}

// Service object containing API calls for user management
export const userService = {
  // Fetches the list of all users
  list() {
    return apiClient.get<User[]>('/users').then((response) => response.data);
  },

  // Sends a POST request to create a new user
  create(payload: CreateUserPayload) {
    return apiClient.post<User>('/users', payload).then((response) => response.data);
  },

  // Sends a PATCH request to update an existing user by its ID
  update(id: number, payload: UpdateUserPayload) {
    return apiClient.patch<User>(`/users/${id}`, payload).then((response) => response.data);
  },

  // Sends a DELETE request to remove a user by its ID
  remove(id: number) {
    return apiClient.delete<{ id: number }>(`/users/${id}`).then((response) => response.data);
  },
};
