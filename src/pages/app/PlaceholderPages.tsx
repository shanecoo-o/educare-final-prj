import { PageContainer } from '@/components/layout/PageContainer';
import { EmptyState } from '@/components/states/EmptyState';
import { Wallet, BookOpen, MessageCircle, Newspaper, Bell, Settings, Menu } from 'lucide-react';

function makePlaceholder(icon: any, title: string, desc: string) {
  return function PlaceholderPage() {
    return (
      <PageContainer>
        <EmptyState icon={icon} title={title} description={desc} />
      </PageContainer>
    );
  };
}

export const FinancePage = makePlaceholder(Wallet, 'Finance Module', 'Tuition, fees, payments, and financial reporting powered by COREOS.');
export const KnowledgePage = makePlaceholder(BookOpen, 'Knowledge Space', 'Resources, library, learning materials, and digital content.');
export const ChatPage = makePlaceholder(MessageCircle, 'Chat', 'Secure messaging between students, teachers, and guardians.');
export const FeedPage = makePlaceholder(Newspaper, 'Feed', 'Announcements, news, and institutional updates.');
export const NotificationsPage = makePlaceholder(Bell, 'Notifications', 'All your alerts and system notifications.');
export const SettingsPage = makePlaceholder(Settings, 'Settings', 'Profile, preferences, and system configuration.');
export const MenuPage = makePlaceholder(Menu, 'More', 'Access all modules and features.');
