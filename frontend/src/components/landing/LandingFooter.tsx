import { Link } from 'react-router-dom';
import { Globe, Library, Mail, Share2 } from 'lucide-react';
import { Container } from '../ui/Container';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Login', to: '/login' },
  { label: 'Register', to: '/register' },
  { label: 'Dashboard', to: '/dashboard' },
];

const socialIcons = [
  { icon: Share2, label: 'Social' },
  { icon: Globe, label: 'Website' },
  { icon: Mail, label: 'Email' },
];

export function LandingFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12">
      <Container>
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link to="/" className="flex items-center gap-2.5 text-slate-900">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
                <Library className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <span className="text-lg font-bold">Library System</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-slate-500">
              Online Library Management System — modern tools for catalogs,
              members, and borrowing.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-600 transition-colors hover:text-brand-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              Connect
            </h3>
            <div className="mt-4 flex gap-3">
              {socialIcons.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-all hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600"
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-100 pt-6 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Library Management System. All rights
          reserved.
        </div>
      </Container>
    </footer>
  );
}
