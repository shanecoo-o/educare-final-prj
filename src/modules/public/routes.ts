import type { AppRoute } from '@/app/router/types';
import LandingPage from '@/pages/public/LandingPage';

export const publicRoutes: AppRoute[] = [
  { path: '/', element: LandingPage, label: 'Home' },
  { path: '/features', element: LandingPage, label: 'Features' },
  { path: '/contact', element: LandingPage, label: 'Contact' },
  { path: '/apply', element: LandingPage, label: 'Apply' },
];
