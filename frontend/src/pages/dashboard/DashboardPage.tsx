import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, UserCircle, Users } from 'lucide-react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { StatCard } from '../../components/dashboard/StatCard';
import { useAuth } from '../../context/AuthContext';
import { statsService } from '../../services/stats.service';

interface DashboardStat {
  label: string;
  value: string;
  colorClass: string;
}

const placeholderStats: DashboardStat[] = [
  { label: 'Total Books', value: '...', colorClass: 'bg-stat-purple' },
  { label: 'Total Users', value: '...', colorClass: 'bg-stat-indigo' },
  { label: 'Recent Books', value: '...', colorClass: 'bg-stat-blue' },
  { label: 'Active Authors', value: '...', colorClass: 'bg-stat-coral' },
];

function formatNumber(value: number) {
  return value.toLocaleString();
}

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [stats, setStats] = useState<DashboardStat[]>(placeholderStats);

  useEffect(() => {
    if (authLoading || !isAuthenticated) {
      return;
    }

    statsService
      .getDashboardStats()
      .then((data) => {
        setStats([
          { label: 'Total Books', value: formatNumber(data.totalBooks), colorClass: 'bg-stat-purple' },
          { label: 'Total Users', value: formatNumber(data.totalUsers), colorClass: 'bg-stat-indigo' },
          { label: 'Recent Books', value: formatNumber(data.recentBooks), colorClass: 'bg-stat-blue' },
          { label: 'Active Authors', value: formatNumber(data.activeAuthors), colorClass: 'bg-stat-coral' },
        ]);
      })
      .catch(() => {
        setStats(placeholderStats.map((stat) => ({ ...stat, value: 'N/A' })));
      });
  }, [authLoading, isAuthenticated]);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Overview of your library
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {stats
          .filter((stat) => !(stat.label === 'Total Users' && user?.role !== 'ADMIN'))
          .map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              colorClass={stat.colorClass}
            />
        ))}
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-lg font-bold text-slate-900">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/dashboard/books"
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 hover:text-brand-600"
          >
            <BookOpen className="h-5 w-5" />
            Manage books
          </Link>
          
          {user?.role === 'ADMIN' && (
            <Link
              to="/dashboard/users"
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 hover:text-brand-600"
            >
              <Users className="h-5 w-5" />
              Manage users
            </Link>
          )}

          <Link
            to="/dashboard/profile"
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 hover:text-brand-600"
          >
            <UserCircle className="h-5 w-5" />
            {user?.role === 'ADMIN' ? 'Edit profile' : 'Manage my profile'}
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
