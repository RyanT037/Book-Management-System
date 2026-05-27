interface StatCardProps {
  label: string;
  value: string;
  colorClass: string;
}

export function StatCard({ label, value, colorClass }: StatCardProps) {
  return (
    <div
      className={`rounded-2xl ${colorClass} p-6 text-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover`}
    >
      {/* Metric label */}
      <p className="text-sm font-medium text-white/90">{label}</p>
      {/* Metric value display */}
      <p className="mt-3 text-4xl font-bold tracking-tight">{value}</p>
    </div>
  );
}
