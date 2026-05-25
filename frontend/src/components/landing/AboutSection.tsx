import { CheckCircle2, Library } from 'lucide-react';
import { aboutStats } from '../../data/landing.data';
import { Section } from '../ui/Section';

const benefits = [
  'Centralized catalog and inventory management',
  'Role-based access for staff and administrators',
  'Streamlined borrowing and return workflows',
  'Actionable insights through a live dashboard',
];

export function AboutSection() {
  return (
    <Section id="about" background="muted">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Digitize your library with confidence
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Our Online Library Management System helps public libraries,
            universities, and community archives manage books, members, and
            daily operations through one cohesive platform.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Built for librarians and IT teams who need reliability, clarity, and
            a modern interface that staff can adopt quickly.
          </p>
          <ul className="mt-8 space-y-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 text-sm text-slate-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-center rounded-3xl border border-slate-200 bg-white p-12 shadow-card">
            <div className="text-center">
              <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg">
                <Library className="h-10 w-10" strokeWidth={1.5} />
              </span>
              <p className="mt-6 text-sm font-medium text-slate-500">
                Illustration placeholder — library operations hub
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {aboutStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-white p-4 text-center shadow-card transition-transform hover:-translate-y-0.5"
              >
                <p className="text-xl font-bold text-brand-700">{stat.value}</p>
                <p className="mt-1 text-xs text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
