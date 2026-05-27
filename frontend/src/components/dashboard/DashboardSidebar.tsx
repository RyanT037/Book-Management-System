import { NavLink } from 'react-router-dom';
import { BookOpen, LayoutDashboard, Library, LogOut, UserPen, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useAuthActions } from '../../hooks/useAuthActions';
import { useAuth } from '../../context/AuthContext';
import { classNameHelper } from '../../lib/classNameHelper';

const sidebarNavItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Books', path: '/dashboard/books' },
  { label: 'Users', path: '/dashboard/users' },
  { label: 'Profile', path: '/dashboard/profile' },
];

const iconMap: Record<string, LucideIcon> = {
  Dashboard: LayoutDashboard,
  Books: BookOpen,
  Users: Users,
  Profile: UserPen,
};

interface DashboardSidebarProps {
  className?: string;
  onNavigate?: () => void;
}

export function DashboardSidebar({ className, onNavigate }: DashboardSidebarProps) {
  const { logout } = useAuthActions();
  const { user } = useAuth();

  return (
    <aside
      className={classNameHelper(
        'flex h-full w-64 shrink-0 flex-col border-r border-slate-200 bg-white',
        className,
      )}
    >
      <div className="flex h-16 items-center gap-2.5 border-b border-slate-100 px-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
          <Library className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <span className="text-base font-bold text-slate-900">Library System</span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {sidebarNavItems
          .filter((item) => !(item.label === 'Users' && user?.role !== 'ADMIN'))
          .map((item) => {
          const Icon = iconMap[item.label] ?? LayoutDashboard;
          return (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={onNavigate}
              end={item.path === '/dashboard'}
              className={({ isActive }) =>
                classNameHelper(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-brand-600',
                )
              }
            >
              <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
              <span className="flex-1">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-slate-100 p-4">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          onClick={() => {
            logout();
            onNavigate?.();
          }}
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
