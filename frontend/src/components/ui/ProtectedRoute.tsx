import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
// Route guard component to protect authenticated routes and handle loading state
export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // Wait for localStorage hydration before redirecting to avoid a false logout.
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
        <div className="flex flex-col items-center gap-3 rounded-3xl bg-slate-900/90 p-8 text-center text-slate-100 shadow-2xl shadow-slate-950/30">
          <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-700 border-t-blue-400" />
          <p className="text-sm font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Preserve a clean history entry so browser back does not reopen the guard.
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
