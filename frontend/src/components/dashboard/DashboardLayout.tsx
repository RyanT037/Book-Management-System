import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { useUiStore } from '../../store/ui.store';
import { DashboardHeader } from './DashboardHeader';
import { DashboardSidebar } from './DashboardSidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { sidebarOpen, setSidebarOpen } = useUiStore();

  return (
    <div className="flex min-h-svh bg-slate-50">
      <div className="hidden lg:block">
        <DashboardSidebar className="fixed inset-y-0 left-0 z-30" />
      </div>

      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
          aria-label="Close sidebar overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 transition-transform duration-300 lg:hidden',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <DashboardSidebar onNavigate={() => setSidebarOpen(false)} />
      </div>

      <div className="flex min-h-svh flex-1 flex-col lg:pl-64">
        <DashboardHeader />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
