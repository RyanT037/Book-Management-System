import { apiClient } from './api';

export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookPayload {
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  description: string;
}

export interface UpdateBookPayload {
  title?: string;
  author?: string;
  isbn?: string;
  publishedYear?: number;
  description?: string;
}

export const bookService = {
  list() {
    return apiClient.get<Book[]>('/books').then((response) => response.data);
  },

  create(payload: CreateBookPayload) {
    return apiClient.post<Book>('/books', payload).then((response) => response.data);
  },

  update(id: number, payload: UpdateBookPayload) {
    return apiClient.put<Book>(`/books/${id}`, payload).then((response) => response.data);
  },

  remove(id: number) {
    return apiClient.delete<{ message: string }>(`/books/${id}`).then((response) => response.data);
  },
};
