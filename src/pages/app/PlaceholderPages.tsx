import { PageContainer } from '@/components/layout/PageContainer';
import { EmptyState } from '@/components/states/EmptyState';
import { Settings, Menu } from 'lucide-react';

function makePlaceholder(icon: any, title: string, desc: string) {
  return function PlaceholderPage() {
    return (
      <PageContainer>
        <EmptyState icon={icon} title={title} description={desc} />
      </PageContainer>
    );
  };
}

export const SettingsPage = makePlaceholder(Settings, 'Settings', 'Profile, preferences, and system configuration.');
export const MenuPage = makePlaceholder(Menu, 'More', 'Access all modules and features.');
