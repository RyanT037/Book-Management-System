import { Link } from 'react-router-dom';
import { ArrowRight, BookMarked, Library, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero pt-12 pb-20 md:pt-20 md:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-indigo-200/50 blur-3xl"
      />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-700 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Online Library Management
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem]">
              Modern Library Management{' '}
              <span className="text-gradient-brand">Made Simple</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg lg:mx-0 mx-auto">
              Manage books, users, borrowing, and library operations efficiently
              with a clean modern platform.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Link to="/register">
                <Button size="lg" className="group">
                  Get Started
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" size="lg">
                  Login
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-6 shadow-card backdrop-blur-sm sm:overflow-visible sm:p-8">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white shadow-lg sm:absolute sm:right-4 sm:top-4 sm:mb-0 sm:h-14 sm:w-14 sm:rounded-2xl md:-right-4 md:-top-4 md:h-16 md:w-16">
                <Library className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" strokeWidth={1.5} />
              </div>
              <div className="grid grid-cols-2 gap-4 sm:pt-2 md:pt-6">
                {[
                  { label: 'Catalog', value: '1.2k', color: 'bg-stat-blue' },
                  { label: 'Members', value: '450', color: 'bg-stat-indigo' },
                  { label: 'Borrowed', value: '320', color: 'bg-stat-purple' },
                  { label: 'Reports', value: 'Live', color: 'bg-stat-coral' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`rounded-2xl ${item.color} p-5 text-white shadow-sm transition-transform duration-300 hover:scale-[1.02]`}
                  >
                    <p className="text-xs font-medium text-white/90">{item.label}</p>
                    <p className="mt-2 text-2xl font-bold">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                <BookMarked className="h-10 w-10 text-brand-600" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Unified library workspace
                  </p>
                  <p className="text-xs text-slate-500">
                    Books, members, borrowing & analytics in one place
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
