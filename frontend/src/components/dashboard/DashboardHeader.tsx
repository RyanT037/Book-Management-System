import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, User } from 'lucide-react';
import { useAuthActions } from '../../hooks/useAuthActions';

interface DashboardHeaderProps {
  toggleSidebar: () => void;
}

export function DashboardHeader({ toggleSidebar }: DashboardHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useAuthActions();

  // Toggle the user dropdown menu visibility
  const toggleUserMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
      {/* Left side: Mobile menu toggle and system title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        <p className="hidden text-sm text-slate-500 sm:block">
          Online Library Management System
        </p>
      </div>

      <div className="relative flex items-center gap-4">
        <button
          type="button"
          onClick={toggleUserMenu}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-indigo-500 text-white shadow-sm transition hover:opacity-90"
          aria-label="Open user menu"
          aria-expanded={isMenuOpen ? 'true' : 'false'}
        >
          <User className="h-5 w-5" />
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 top-full z-20 mt-2 w-44 overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-xl">
            <div className="space-y-1 p-2">
              <Link
                to="/dashboard/profile"
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
              >
                <span className="inline-block h-4 w-4 rounded-full bg-slate-200" />
                <span>Logout</span>
              </button>
            </div>

          </div>
        )}
      </div>
    </header>
  );
}
