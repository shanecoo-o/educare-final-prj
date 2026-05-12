import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import logo from '@/assets/colegiobelo-logo.webp';

interface BrandProps {
  variant?: 'full' | 'mark' | 'stack';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  className?: string;
  subtitle?: string;
  tone?: 'default' | 'onPrimary';
}

const sizeMap = {
  sm: { mark: 'h-7 w-7', text: 'text-sm', sub: 'text-[10px]' },
  md: { mark: 'h-9 w-9', text: 'text-base', sub: 'text-[11px]' },
  lg: { mark: 'h-12 w-12', text: 'text-xl', sub: 'text-xs' },
};

export function Brand({ variant = 'full', size = 'md', to, className, subtitle, tone = 'default' }: BrandProps) {
  const s = sizeMap[size];
  const content = (
    <div className={cn('flex items-center gap-2.5', className)}>
      <div className={cn('relative shrink-0 overflow-hidden rounded-xl bg-card ring-1 ring-primary/10 shadow-sm', s.mark)}>
        <img src={logo} alt="Colégio Belo Horizonte" className="h-full w-full object-contain" />
      </div>
      {variant !== 'mark' && (
        <div className="min-w-0 leading-tight">
          <p className={cn(
            'font-heading font-bold tracking-tight',
            s.text,
            tone === 'onPrimary' ? 'text-primary-foreground' : 'text-foreground'
          )}>
            <span>Colégio</span>
            <span className="ml-1 font-medium text-accent">Belo Horizonte</span>
          </p>
          {subtitle && (
            <p className={cn(s.sub, 'truncate', tone === 'onPrimary' ? 'text-primary-foreground/70' : 'text-muted-foreground')}>
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
  if (to) return <Link to={to} className="inline-flex">{content}</Link>;
  return content;
}