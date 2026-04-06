import { useState } from 'react';
import { GraduationCap, Wallet, Bell as BellIcon, MessageCircle, Megaphone, CheckCircle } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { NotificationItem } from '@/components/notifications/NotificationItem';
import { CategoryPill } from '@/components/knowledge/CategoryPill';

const filters = ['All', 'Academic', 'Finance', 'Communication', 'Institutional'];

const notifications = [
  { icon: GraduationCap, title: 'New grade published', description: 'Your Midterm Exam grade for Mathematics II is now available: 18/20.', time: '2h ago', type: 'academic' as const, read: false, actionLabel: 'View Grade' },
  { icon: Wallet, title: 'Payment due soon', description: 'Lab Fee — Chemistry ($150) is due on June 30. Pay now to avoid late fees.', time: '4h ago', type: 'finance' as const, read: false, actionLabel: 'Pay Now' },
  { icon: GraduationCap, title: 'New content available', description: 'Newton\'s Laws Explained video has been added to Physics knowledge space.', time: '1d ago', type: 'academic' as const, read: false, actionLabel: 'View' },
  { icon: CheckCircle, title: 'Payment validated', description: 'Your tuition payment of $2,400 for Term 1 has been validated. Receipt available.', time: '1d ago', type: 'finance' as const, read: true, actionLabel: 'Download Receipt' },
  { icon: MessageCircle, title: 'New message from Dr. Smith', description: 'Homework deadline extended to Friday, June 20th.', time: '1d ago', type: 'communication' as const, read: true },
  { icon: Megaphone, title: 'Institutional notice', description: 'Annual Day celebration announced for September 15, 2025.', time: '2d ago', type: 'institutional' as const, read: true },
  { icon: GraduationCap, title: 'Schedule change', description: 'Biology class on Thursday rescheduled to 3:00 PM, Room 302.', time: '2d ago', type: 'academic' as const, read: true },
  { icon: Wallet, title: 'Library fine', description: 'You have an outstanding library fine of $25. Please settle it at the finance office.', time: '5d ago', type: 'finance' as const, read: true, actionLabel: 'View Details' },
];

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? notifications
    : notifications.filter(n => n.type === activeFilter.toLowerCase());

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <PageContainer>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Notifications</h1>
          <p className="mt-1 text-sm text-muted-foreground">{unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</p>
        </div>
        <button className="text-xs font-medium text-primary hover:underline">Mark all read</button>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {filters.map(f => (
          <CategoryPill key={f} label={f} active={activeFilter === f} onClick={() => setActiveFilter(f)} />
        ))}
      </div>

      <div className="space-y-1 rounded-2xl border border-border bg-card overflow-hidden">
        {filtered.map((n, i) => <NotificationItem key={i} {...n} />)}
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-muted-foreground">No notifications in this category.</div>
        )}
      </div>
    </PageContainer>
  );
}
