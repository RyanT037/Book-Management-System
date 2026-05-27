export interface DashboardStat {
  label: string;
  value: string;
  colorClass: string;
}
// Sample data for dashboard statistics, to be replaced with real backend data
export const dashboardStats: DashboardStat[] = [
  { label: 'Total Books', value: '0', colorClass: 'bg-stat-purple' },
  { label: 'Total Users', value: '0', colorClass: 'bg-stat-indigo' },
  { label: 'Recent Books', value: '0', colorClass: 'bg-stat-blue' },
  { label: 'Active Authors', value: '0', colorClass: 'bg-stat-coral' },
];
// Sample navigation items for the dashboard sidebar, with active state for the current page
export const sidebarNavItems = [
  { label: 'Dashboard', path: '/dashboard', active: true },
  { label: 'Books', path: '/dashboard/books' },
  { label: 'Users', path: '/dashboard/users' },
  { label: 'Profile', path: '/dashboard/profile' },
];
