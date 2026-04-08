import type { RouteModule } from '@/app/router/types';
import KnowledgePage from '@/pages/app/KnowledgePage';

export const knowledgeModule: RouteModule = {
  basePath: 'knowledge',
  roles: ['student', 'guardian', 'teacher', 'academic_coordinator', 'school_admin', 'super_admin'],
  routes: [
    { path: '*', element: KnowledgePage, label: 'Knowledge Space' },
  ],
};
