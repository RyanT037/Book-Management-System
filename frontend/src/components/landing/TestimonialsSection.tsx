import { Quote } from 'lucide-react';
import { testimonials } from '../../data/landing.data';
import { Card } from '../ui/Card';
import { Section } from '../ui/Section';

export function TestimonialsSection() {
  return (
    <Section id="testimonials" background="muted">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Loved by library professionals
        </h2>
        <p className="mt-4 text-slate-600">
          Hear from teams who modernized their daily operations.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((item) => (
          <Card key={item.name} hover className="relative border border-slate-100">
            <Quote className="absolute right-6 top-6 h-8 w-8 text-brand-100" />
            <div className="flex items-center gap-3">
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white ${item.accentClass}`}
              >
                {item.initials}
              </span>
              <div>
                <p className="font-semibold text-slate-900">{item.name}</p>
                <p className="text-xs text-slate-500">{item.role}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              &ldquo;{item.quote}&rdquo;
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
