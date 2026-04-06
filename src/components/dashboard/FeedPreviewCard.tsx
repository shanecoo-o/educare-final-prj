import { cn } from '@/lib/utils';

interface FeedPreviewCardProps {
  category: string;
  title: string;
  time: string;
  variant?: 'academic' | 'finance' | 'institutional';
}

const pillStyles = {
  academic: 'bg-primary/10 text-primary',
  finance: 'bg-warning/10 text-warning',
  institutional: 'bg-info/10 text-info',
};

export function FeedPreviewCard({ category, title, time, variant = 'institutional' }: FeedPreviewCardProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg px-1 py-2.5">
      <div className={cn('mt-0.5 shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider', pillStyles[variant])}>
        {category}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{title}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  );
}
