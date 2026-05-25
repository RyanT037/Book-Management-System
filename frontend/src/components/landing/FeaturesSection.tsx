import { features } from '../../data/landing.data';
import { Card } from '../ui/Card';
import { Section } from '../ui/Section';

export function FeaturesSection() {
  return (
    <Section id="features" background="white">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Everything you need to run your library
        </h2>
        <p className="mt-4 text-slate-600">
          Powerful modules designed for librarians, administrators, and modern
          reading communities.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, description }) => (
          <Card key={title} hover className="group border border-slate-100">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
              <Icon className="h-6 w-6" strokeWidth={1.75} />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
