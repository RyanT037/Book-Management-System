export interface DashboardStat {
  label: string;
  value: string;
  colorClass: string;
}

// TODO: Connect to backend API on Day 5
export const dashboardStats: DashboardStat[] = [
  { label: 'Total Books', value: '156', colorClass: 'bg-stat-purple' },
  { label: 'Total Users', value: '89', colorClass: 'bg-stat-indigo' },
  { label: 'Recent Books', value: '8', colorClass: 'bg-stat-blue' },
  { label: 'New Users', value: '3', colorClass: 'bg-stat-coral' },
  { label: 'Active Authors', value: '24', colorClass: 'bg-stat-blue' },
  { label: 'Owned Books', value: '114', colorClass: 'bg-stat-indigo' },
];

export const sidebarNavItems = [
  { label: 'Dashboard', path: '/dashboard', active: true },
  { label: 'Books', path: '/dashboard/books' },
  { label: 'Users', path: '/dashboard/users' },
  { label: 'Profile', path: '/dashboard/profile' },
];
