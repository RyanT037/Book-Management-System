import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { StatCard } from '../../components/dashboard/StatCard';
import { dashboardStats } from '../../data/dashboard.data';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Overview of your library — mock data until Day 5 API integration.
        </p>
      </div>

      {/* TODO: Connect to backend API on Day 5 */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {dashboardStats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            colorClass={stat.colorClass}
          />
        ))}
      </div>
    </DashboardLayout>
  );
}
