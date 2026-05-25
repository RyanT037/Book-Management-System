import { NavLink } from 'react-router-dom';
import {
  BookOpen,
  ChevronRight,
  FileText,
  FolderTree,
  LayoutDashboard,
  Library,
  LogOut,
  Search,
  Settings,
  UserPen,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/cn';
import { sidebarNavItems } from '../../data/dashboard.data';

const iconMap: Record<string, LucideIcon> = {
  Dashboard: LayoutDashboard,
  Category: FolderTree,
  Author: UserPen,
  Books: BookOpen,
  Member: Users,
  Borrow: Library,
  Search: Search,
  Report: FileText,
  Settings: Settings,
};

interface DashboardSidebarProps {
  className?: string;
  onNavigate?: () => void;
}

export function DashboardSidebar({ className, onNavigate }: DashboardSidebarProps) {
  return (
    <aside
      className={cn(
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
        {sidebarNavItems.map((item) => {
          const Icon = iconMap[item.label] ?? LayoutDashboard;
          return (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={onNavigate}
              end={item.path === '/dashboard'}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-brand-600',
                )
              }
            >
              <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
              <span className="flex-1">{item.label}</span>
              {item.hasSubmenu && (
                <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-slate-100 p-4">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
        <p className="mt-2 text-xs text-slate-400">
          {/* Day five: add sidebar logout functionality here */}
        </p>
      </div>
    </aside>
  );
}
