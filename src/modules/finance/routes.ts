import type { RouteModule } from '@/app/router/types';
import FinancePage from '@/pages/app/FinancePage';
import { FinanceAdminDashboard } from '@/pages/app/RoleDashboards';

/**
 * Finance module – isolated for future COREOS/ERP integration.
 * Contains both student-facing finance views and admin finance dashboard.
 */
export const financeModule: RouteModule = {
  basePath: 'finance',
  roles: ['student', 'guardian', 'finance', 'school_admin', 'super_admin', 'secretary'],
  routes: [
    { path: '*', element: FinancePage, label: 'Finance' },
  ],
};

export const financeAdminModule: RouteModule = {
  basePath: 'admin',
  roles: ['finance', 'school_admin', 'super_admin'],
  routes: [
    { path: '*', element: FinanceAdminDashboard, label: 'Finance Admin' },
  ],
};
