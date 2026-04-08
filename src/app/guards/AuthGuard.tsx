import { Navigate, Outlet, useLocation } from 'react-router-dom';

/**
 * AuthGuard – wraps authenticated route groups.
 * Currently uses a placeholder check (always authenticated).
 * Replace `isAuthenticated` with real auth state when backend is connected.
 */
export function AuthGuard() {
  const location = useLocation();
  // TODO: replace with real auth check (e.g. Supabase session)
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
