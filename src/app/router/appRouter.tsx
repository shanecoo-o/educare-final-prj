import { Route, Routes } from 'react-router-dom';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { AppLayout } from '@/components/layout/AppLayout';
import { AuthGuard } from '@/app/guards/AuthGuard';
import NotFound from '@/pages/NotFound';

// Module routes
import { publicRoutes } from '@/modules/public/routes';
import { authRoutes } from '@/modules/auth/routes';
import { sharedAppRoutes } from '@/modules/shared/routes';
import { academicModule } from '@/modules/academic/routes';
import { financeModule, financeAdminModule } from '@/modules/finance/routes';
import { knowledgeModule } from '@/modules/knowledge/routes';
import { studentModule } from '@/modules/student/routes';
import { guardianModule } from '@/modules/guardian/routes';
import { teacherModule } from '@/modules/teacher/routes';

import type { AppRoute, RouteModule } from './types';

function renderRoute(route: AppRoute) {
  const Element = route.element;
  return (
    <Route
      key={route.path}
      path={route.path}
      index={route.index}
      element={<Element />}
    />
  );
}

function renderModule(mod: RouteModule) {
  return (
    <Route key={mod.basePath} path={`${mod.basePath}/*`}>
      {mod.routes.map(renderRoute)}
    </Route>
  );
}

export function AppRouter() {
  return (
    <Routes>
      {/* ─── Public ─── */}
      <Route element={<PublicLayout />}>
        {publicRoutes.map(renderRoute)}
      </Route>

      {/* ─── Auth (no layout wrapper) ─── */}
      {authRoutes.map(renderRoute)}

      {/* ─── Authenticated App Shell ─── */}
      <Route element={<AuthGuard />}>
        <Route path="/app" element={<AppLayout />}>
          {/* Shared routes (all roles) */}
          {sharedAppRoutes.map(renderRoute)}

          {/* Domain modules */}
          {renderModule(academicModule)}
          {renderModule(financeModule)}
          {renderModule(financeAdminModule)}
          {renderModule(knowledgeModule)}

          {/* Role-specific modules */}
          {renderModule(studentModule)}
          {renderModule(guardianModule)}
          {renderModule(teacherModule)}
        </Route>
      </Route>

      {/* ─── Catch-all ─── */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
