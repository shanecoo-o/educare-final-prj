import type { RouteModule } from '@/app/router/types';
import { StudentDashboard } from '@/pages/app/RoleDashboards';

export const studentModule: RouteModule = {
  basePath: 'student',
  roles: ['student'],
  routes: [
    { path: '*', element: StudentDashboard, label: 'Student Dashboard' },
  ],
};
