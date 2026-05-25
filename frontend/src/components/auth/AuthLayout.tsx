import { Link } from 'react-router-dom';
import { ArrowLeft, Library } from 'lucide-react';
import type { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-svh bg-slate-50">
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-brand-600 via-brand-500 to-indigo-600 lg:flex lg:flex-col lg:justify-between lg:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-indigo-400/30 blur-3xl"
          />

          <Link to="/" className="relative flex items-center gap-3 text-white">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Library className="h-6 w-6" strokeWidth={1.75} />
            </span>
            <span className="text-xl font-bold">Library System</span>
          </Link>

          <div className="relative max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-white">
              Online Library Management System
            </h2>
            <p className="mt-4 text-white/85 leading-relaxed">
              Access your dashboard to manage categories, authors, books,
              members, and borrowing — all in one professional workspace.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { label: 'Categories', value: '8' },
                { label: 'Books', value: '156' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl bg-white/15 p-4 backdrop-blur-sm"
                >
                  <p className="text-xs text-white/80">{item.label}</p>
                  <p className="mt-1 text-2xl font-bold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="relative text-sm text-white/70">
            &copy; {new Date().getFullYear()} Library Management System
          </p>
        </div>

        <div className="flex flex-col justify-center px-4 py-12 sm:px-8 lg:px-16">
          <Link
            to="/"
            className="mb-8 flex items-center gap-2 text-brand-600 lg:hidden"
          >
            <Library className="h-5 w-5" />
            <span className="font-bold text-slate-900">Library System</span>
          </Link>

          <div className="mx-auto w-full max-w-md">
            <Link
              to="/"
              className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-brand-600"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Go back
            </Link>

            <div className="mb-8">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {title}
              </h1>
              <p className="mt-2 text-slate-600">{subtitle}</p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-card backdrop-blur-sm sm:p-8">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
