import { apiClient } from './api';

// Interface representing the structure of a Book object from the backend
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

// Payload structure for creating a new book record
export interface CreateBookPayload {
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  description: string;
}

// Payload structure for updating an existing book record (all fields optional)
export interface UpdateBookPayload {
  title?: string;
  author?: string;
  isbn?: string;
  publishedYear?: number;
  description?: string;
}

// Service object containing API calls for book management
export const bookService = {
  // Fetches the list of all books
  list() {
    return apiClient.get<Book[]>('/books').then((response) => response.data);
  },

  // Sends a POST request to create a new book
  create(payload: CreateBookPayload) {
    return apiClient.post<Book>('/books', payload).then((response) => response.data);
  },

  // Sends a PUT request to update an existing book by its ID
  update(id: number, payload: UpdateBookPayload) {
    return apiClient.put<Book>(`/books/${id}`, payload).then((response) => response.data);
  },

  // Sends a DELETE request to remove a book by its ID
  remove(id: number) {
    return apiClient.delete<{ message: string }>(`/books/${id}`).then((response) => response.data);
  },
};
