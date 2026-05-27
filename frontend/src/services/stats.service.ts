import { apiClient } from './api';

// Interface for statistics displayed on the public landing page
export interface PublicStatsResponse {
  totalBooks: number;
  registeredUsers: number;
  activeAuthors: number;
  recentBooks: number;
}

// Interface for statistics displayed on the authenticated dashboard
export interface DashboardStatsResponse {
  totalBooks: number;
  totalUsers: number;
  activeAuthors: number;
  recentBooks: number;
}

// Service object for fetching system-wide statistics
export const statsService = {
  // Fetches general statistics available to unauthenticated users
  getPublicStats() {
    return apiClient.get<PublicStatsResponse>('/stats/public').then((response) => response.data);
  },

  // Fetches detailed statistics for the administrative dashboard
  getDashboardStats() {
    return apiClient.get<DashboardStatsResponse>('/stats/dashboard').then((response) => response.data);
  },
};
