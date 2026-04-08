import type { AppRoute } from '@/app/router/types';
import LoginPage from '@/pages/auth/LoginPage';

export const authRoutes: AppRoute[] = [
  { path: '/login', element: LoginPage, label: 'Login' },
  { path: '/forgot-password', element: LoginPage, label: 'Forgot Password' },
];
