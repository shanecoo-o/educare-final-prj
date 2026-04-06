import { Search, Bell, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppTopbarProps {
  sidebarCollapsed: boolean;
  pageTitle?: string;
}

export function AppTopbar({ sidebarCollapsed, pageTitle }: AppTopbarProps) {
  return (
    <header
      className={cn(
        'fixed top-0 right-0 z-30 flex h-[var(--topbar-height)] items-center justify-between border-b border-border bg-background/80 glass px-6 transition-all duration-300',
        sidebarCollapsed
          ? 'left-[var(--sidebar-collapsed-width)]'
          : 'left-[var(--sidebar-width)]',
        'max-md:left-0'
      )}
    >
      {/* Left: page title */}
      <div className="flex items-center gap-4">
        {pageTitle && (
          <h1 className="font-heading text-lg font-semibold text-foreground">
            {pageTitle}
          </h1>
        )}
      </div>

      {/* Center: search */}
      <div className="hidden md:flex max-w-md flex-1 mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search anything... ⌘K"
            className="w-full rounded-xl border border-border bg-muted/50 py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
          />
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        <button className="relative flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted transition-colors md:hidden">
          <Search className="h-[18px] w-[18px]" />
        </button>
        <button className="relative flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted transition-colors">
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
        </button>
        <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-foreground transition-colors hover:bg-accent">
          <User className="h-[18px] w-[18px]" />
        </button>
      </div>
    </header>
  );
}
