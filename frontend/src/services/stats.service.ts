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
    return apiClient.get<PublicStatsResponse>('/stats/public').then((r) => r.data);
  },

  getDashboardStats() {
    return apiClient.get<DashboardStatsResponse>('/stats/dashboard').then((r) => r.data);
  },
};
