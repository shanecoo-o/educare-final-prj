import type { RouteModule } from '@/app/router/types';
import { GuardianDashboard } from '@/pages/app/RoleDashboards';

export const guardianModule: RouteModule = {
  basePath: 'guardian',
  roles: ['guardian'],
  routes: [
    { path: '*', element: GuardianDashboard, label: 'Guardian Dashboard' },
  ],
};
