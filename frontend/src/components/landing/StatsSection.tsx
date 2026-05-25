import { landingStats } from '../../data/landing.data';
import { Section } from '../ui/Section';

export function StatsSection() {
  return (
    <Section id="stats" background="white">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Trusted by growing libraries
        </h2>
        <p className="mt-4 text-slate-600">
          Live metrics preview — production data connects on Day 5.
        </p>
      </div>

      {/* TODO: Connect to backend API on Day 5 */}
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {landingStats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-2xl ${stat.colorClass} p-6 text-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover`}
          >
            <p className="text-sm font-medium text-white/90">{stat.label}</p>
            <p className="mt-3 text-4xl font-bold tracking-tight">{stat.value}</p>
            <button
              type="button"
              className="mt-4 text-sm font-medium text-white/90 underline-offset-2 transition hover:text-white hover:underline"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </Section>
  );
}
