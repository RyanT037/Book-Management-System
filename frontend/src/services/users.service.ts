import { apiClient } from './api';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

export interface CreateUserPayload {
  name: string;
  username: string;
  email: string;
  password: string;
  role: User['role'];
}

export interface UpdateUserPayload {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: User['role'];
}

export const userService = {
  list() {
    return apiClient.get<User[]>('/users').then((response) => response.data);
  },

  create(payload: CreateUserPayload) {
    return apiClient.post<User>('/users', payload).then((response) => response.data);
  },

  update(id: number, payload: UpdateUserPayload) {
    return apiClient.patch<User>(`/users/${id}`, payload).then((response) => response.data);
  },

  remove(id: number) {
    return apiClient.delete<{ id: number }>(`/users/${id}`).then((response) => response.data);
  },
};
