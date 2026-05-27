import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import DashboardPage from "../pages/dashboard/DashboardPage";
import BooksPage from "../pages/dashboard/BooksPage";
import UsersPage from "../pages/dashboard/UsersPage";
import ProfilePage from "../pages/dashboard/ProfilePage";
import LandingPage from "../pages/public/LandingPage";
import { ProtectedRoute } from "../components/ui/ProtectedRoute";

export function AppRoutes() {
  return (
    <Routes>
      {/* Public routes stay outside the authenticated dashboard shell. */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Dashboard children inherit the ProtectedRoute authentication check. */}
      <Route path="/dashboard" element={<ProtectedRoute />}>
        <Route index element={<DashboardPage />} />
        <Route path="books" element={<BooksPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      {/* Unknown routes return visitors to the public entry point. */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
