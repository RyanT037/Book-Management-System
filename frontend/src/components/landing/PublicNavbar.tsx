import { Link, useLocation } from 'react-router-dom';
import { Library, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { classNameHelper } from '../../lib/classNameHelper';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'About', href: '#about' },
  { label: 'Stats', href: '#stats' },
  { label: 'Testimonials', href: '#testimonials' },
];

export function PublicNavbar() {
  // State to manage mobile navigation menu visibility
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-2.5 text-slate-900 transition-opacity hover:opacity-80"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm">
              <Library className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <span className="text-lg font-bold tracking-tight">Library System</span>
          </Link>

          {isLanding && (
            <nav className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 transition-colors hover:text-brand-600"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}

          <div className="hidden items-center gap-3 sm:flex">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <div
          className={classNameHelper(
            'overflow-hidden border-t border-slate-100 transition-all md:hidden',
            mobileOpen ? 'max-h-96 pb-4' : 'max-h-0 border-transparent',
          )}
        >
          {isLanding &&
            navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-2.5 text-sm font-medium text-slate-600"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
          <div className="mt-3 flex flex-col gap-2">
            <Link to="/login" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" fullWidth size="sm">
                Login
              </Button>
            </Link>
            <Link to="/register" onClick={() => setMobileOpen(false)}>
              <Button fullWidth size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
