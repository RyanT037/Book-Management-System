export interface DashboardStat {
  label: string;
  value: string;
  colorClass: string;
}

export const dashboardStats: DashboardStat[] = [
  { label: 'Total Books', value: '...', colorClass: 'bg-stat-purple' },
  { label: 'Total Users', value: '...', colorClass: 'bg-stat-indigo' },
  { label: 'Recent Books', value: '...', colorClass: 'bg-stat-blue' },
  { label: 'Active Authors', value: '...', colorClass: 'bg-stat-coral' },
];

export const sidebarNavItems = [
  { label: 'Dashboard', path: '/dashboard', active: true },
  { label: 'Books', path: '/dashboard/books' },
  { label: 'Users', path: '/dashboard/users' },
  { label: 'Profile', path: '/dashboard/profile' },
];
