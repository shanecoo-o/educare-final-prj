import type { RouteModule } from '@/app/router/types';
import { TeacherDashboard } from '@/pages/app/RoleDashboards';

export const teacherModule: RouteModule = {
  basePath: 'teacher',
  roles: ['teacher'],
  routes: [
    { path: '*', element: TeacherDashboard, label: 'Teacher Dashboard' },
  ],
};
