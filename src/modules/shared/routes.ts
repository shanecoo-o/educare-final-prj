import type { AppRoute } from '@/app/router/types';
import DashboardPage from '@/pages/app/DashboardPage';
import ChatPage from '@/pages/app/ChatPage';
import FeedPage from '@/pages/app/FeedPage';
import NotificationsPage from '@/pages/app/NotificationsPage';
import SettingsPage from '@/pages/app/SettingsPage';
import { MenuPage } from '@/pages/app/PlaceholderPages';

/**
 * Shared app routes – accessible to all authenticated roles.
 */
export const sharedAppRoutes: AppRoute[] = [
  { path: '', element: DashboardPage, index: true, label: 'Dashboard' },
  { path: 'chat/*', element: ChatPage, label: 'Chat' },
  { path: 'feed', element: FeedPage, label: 'Feed' },
  { path: 'notifications', element: NotificationsPage, label: 'Notifications' },
  { path: 'settings', element: SettingsPage, label: 'Settings' },
  { path: 'menu', element: MenuPage, label: 'Menu' },
  { path: 'search', element: DashboardPage, label: 'Search' },
  { path: 'profile', element: SettingsPage, label: 'Profile' },
];
