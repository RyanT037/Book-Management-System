import { apiClient } from './api';

export interface PublicStatsResponse {
  totalBooks: number;
  registeredUsers: number;
  activeAuthors: number;
  recentBooks: number;
}

export interface DashboardStatsResponse {
  totalBooks: number;
  totalUsers: number;
  activeAuthors: number;
  recentBooks: number;
}

export const statsService = {
  getPublicStats() {
    return apiClient.get<PublicStatsResponse>('/stats/public').then((response) => response.data);
  },

  getDashboardStats() {
    return apiClient.get<DashboardStatsResponse>('/stats/dashboard').then((response) => response.data);
  },
};
