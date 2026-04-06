import { type LucideIcon, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

type NotificationType = 'academic' | 'finance' | 'institutional' | 'communication';

interface NotificationItemProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  time: string;
  type: NotificationType;
  read?: boolean;
  actionLabel?: string;
  onAction?: () => void;
}

const typeStyles: Record<NotificationType, string> = {
  academic: 'bg-primary/10 text-primary',
  finance: 'bg-warning/10 text-warning',
  institutional: 'bg-info/10 text-info',
  communication: 'bg-accent text-accent-foreground',
};

export function NotificationItem({ icon: Icon = GraduationCap, title, description, time, type, read, actionLabel, onAction }: NotificationItemProps) {
  return (
    <div className={cn('flex items-start gap-3 rounded-xl px-4 py-3.5 transition-colors', !read && 'bg-primary/[0.02]')}>
      <div className={cn('mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg', typeStyles[type])}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={cn('text-sm text-foreground', !read ? 'font-semibold' : 'font-medium')}>{title}</p>
          <span className="shrink-0 text-[10px] text-muted-foreground">{time}</span>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        {actionLabel && (
          <button onClick={onAction} className="mt-2 text-xs font-medium text-primary hover:underline">
            {actionLabel}
          </button>
        )}
      </div>
      {!read && <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />}
    </div>
  );
}
