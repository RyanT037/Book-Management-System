import { useEffect, useState } from 'react';
import { Section } from '../ui/Section';
import { statsService } from '../../services/stats.service';
import type { StatItem } from '../../data/landing.data';

const placeholderStats: StatItem[] = [
  { label: 'Total Books', value: '...', colorClass: 'bg-stat-blue' },
  { label: 'Registered Users', value: '...', colorClass: 'bg-stat-indigo' },
  { label: 'Active Authors', value: '...', colorClass: 'bg-stat-purple' },
  { label: 'Recent Books', value: '...', colorClass: 'bg-stat-coral' },
];

function formatNumber(value: number) {
  return value.toLocaleString();
}

export function StatsSection() {
  const [stats, setStats] = useState<StatItem[]>(placeholderStats);

  useEffect(() => {
    statsService
      .getPublicStats()
      .then((data) => {
        setStats([
          { label: 'Total Books', value: formatNumber(data.totalBooks), colorClass: 'bg-stat-blue' },
          { label: 'Registered Users', value: formatNumber(data.registeredUsers), colorClass: 'bg-stat-indigo' },
          { label: 'Active Authors', value: formatNumber(data.activeAuthors), colorClass: 'bg-stat-purple' },
          { label: 'Recent Books', value: formatNumber(data.recentBooks), colorClass: 'bg-stat-coral' },
        ]);
      })
      .catch(() => {
        setStats(placeholderStats.map((stat) => ({ ...stat, value: 'N/A' })));
      });
  }, []);

  return (
    <Section id="stats" background="white">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Trusted by growing libraries
        </h2>
        <p className="mt-4 text-slate-600">
          Live metrics preview — production data now loads from the backend.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-2xl ${stat.colorClass} p-6 text-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover`}
          >
            <p className="text-sm font-medium text-white/90">{stat.label}</p>
            <p className="mt-3 text-4xl font-bold tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
