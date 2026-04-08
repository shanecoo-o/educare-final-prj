import type { RouteModule } from '@/app/router/types';
import AcademicPage from '@/pages/app/AcademicPage';

export const academicModule: RouteModule = {
  basePath: 'academic',
  roles: ['student', 'guardian', 'teacher', 'academic_coordinator', 'school_admin', 'super_admin'],
  routes: [
    { path: '*', element: AcademicPage, label: 'Academic' },
  ],
};
