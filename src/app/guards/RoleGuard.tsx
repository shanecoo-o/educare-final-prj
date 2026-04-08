import { Navigate, Outlet } from 'react-router-dom';
import type { UserRole } from '@/types/roles';

interface RoleGuardProps {
  allowed: UserRole[];
}

/**
 * RoleGuard – restricts access to specific roles.
 * Wraps a <Route> group. Renders children if current user role is in `allowed`.
 * Replace `currentRole` with real role from auth context.
 */
export function RoleGuard({ allowed }: RoleGuardProps) {
  // TODO: replace with real role from auth context
  const currentRole: UserRole = 'student';

  if (!allowed.includes(currentRole)) {
    return <Navigate to="/app" replace />;
  }

  return <Outlet />;
}
