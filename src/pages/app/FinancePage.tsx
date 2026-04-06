import { useState } from 'react';
import { Wallet, TrendingUp, AlertTriangle, CheckCircle, Receipt, CreditCard, FileText, Download } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/ui/section-header';
import { InvoiceCard } from '@/components/finance/InvoiceCard';
import { CategoryPill } from '@/components/knowledge/CategoryPill';
import type { PaymentStatus } from '@/components/finance/PaymentStatusBadge';

const tabs = ['Overview', 'Obligations', 'Payments', 'Receipts'];

interface Obligation {
  id: string;
  concept: string;
  amount: string;
  dueDate: string;
  status: PaymentStatus;
  student?: string;
}

const obligations: Obligation[] = [
  { id: 'INV-2025-001', concept: 'Tuition Fee — Term 2', amount: '$2,400', dueDate: 'Jul 15, 2025', status: 'pending' },
  { id: 'INV-2025-002', concept: 'Lab Fee — Chemistry', amount: '$150', dueDate: 'Jun 30, 2025', status: 'due_soon' },
  { id: 'INV-2024-018', concept: 'Library Fine', amount: '$25', dueDate: 'Jun 1, 2025', status: 'overdue' },
  { id: 'INV-2025-003', concept: 'Sports Equipment', amount: '$80', dueDate: 'Aug 1, 2025', status: 'pending' },
  { id: 'INV-2024-015', concept: 'Tuition Fee — Term 1', amount: '$2,400', dueDate: 'Jan 15, 2025', status: 'paid' },
  { id: 'INV-2024-016', concept: 'Registration Fee', amount: '$350', dueDate: 'Dec 1, 2024', status: 'validated' },
  { id: 'INV-2025-004', concept: 'Field Trip — Biology', amount: '$60', dueDate: 'Jul 5, 2025', status: 'partial' },
  { id: 'INV-2025-005', concept: 'Exam Re-sit Fee', amount: '$45', dueDate: 'Jul 20, 2025', status: 'under_review' },
];

const summaryStats = {
  totalDue: '$2,760',
  totalPaid: '$5,150',
  overdue: '$25',
  pending: '$2,735',
};

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredObligations = statusFilter === 'all'
    ? obligations
    : obligations.filter(o => o.status === statusFilter);

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Finance</h1>
        <p className="mt-1 text-sm text-muted-foreground">Tuition, fees, payments, and financial status.</p>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {tabs.map((tab) => (
          <CategoryPill key={tab} label={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)} />
        ))}
      </div>

      {activeTab === 'Overview' && (
        <div className="space-y-6">
          {/* Summary cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border border-border bg-card p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted"><Wallet className="h-4 w-4 text-muted-foreground" /></div>
              <p className="mt-3 font-heading text-xl font-bold text-foreground">{summaryStats.totalDue}</p>
              <p className="text-xs text-muted-foreground">Total Due</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/10"><CheckCircle className="h-4 w-4 text-success" /></div>
              <p className="mt-3 font-heading text-xl font-bold text-foreground">{summaryStats.totalPaid}</p>
              <p className="text-xs text-success">Total Paid</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/10"><AlertTriangle className="h-4 w-4 text-destructive" /></div>
              <p className="mt-3 font-heading text-xl font-bold text-foreground">{summaryStats.overdue}</p>
              <p className="text-xs text-destructive">Overdue</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning/10"><TrendingUp className="h-4 w-4 text-warning" /></div>
              <p className="mt-3 font-heading text-xl font-bold text-foreground">{summaryStats.pending}</p>
              <p className="text-xs text-warning">Pending</p>
            </div>
          </div>

          {/* Current account */}
          <div className="rounded-2xl bg-surface-dark p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-surface-dark-foreground/60">Current Account Balance</p>
                <p className="mt-1 font-heading text-2xl font-bold text-surface-dark-foreground">-$2,760.00</p>
              </div>
              <button className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                <CreditCard className="mr-1.5 inline h-4 w-4" />Make Payment
              </button>
            </div>
            <div className="mt-4 flex gap-4 text-xs text-surface-dark-foreground/50">
              <span>Last payment: $2,400 on Jan 15</span>
              <span>·</span>
              <span>Next due: Jul 15</span>
            </div>
          </div>

          {/* Recent obligations */}
          <div>
            <SectionHeader title="Recent Obligations" action={<button className="text-xs font-medium text-primary hover:underline">View All</button>} />
            <div className="mt-3 space-y-2">
              {obligations.filter(o => ['pending', 'due_soon', 'overdue', 'partial'].includes(o.status)).slice(0, 4).map((o) => (
                <InvoiceCard key={o.id} {...o} />
              ))}
            </div>
          </div>

          {/* Recent payments */}
          <div>
            <SectionHeader title="Recent Payments" />
            <div className="mt-3 space-y-2">
              {obligations.filter(o => ['paid', 'validated'].includes(o.status)).map((o) => (
                <InvoiceCard key={o.id} {...o} />
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Obligations' && (
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            {['all', 'pending', 'due_soon', 'overdue', 'partial', 'under_review'].map(s => (
              <CategoryPill key={s} label={s === 'all' ? 'All' : s.replace('_', ' ')} active={statusFilter === s} onClick={() => setStatusFilter(s)} />
            ))}
          </div>
          <div className="space-y-2">
            {filteredObligations.map(o => <InvoiceCard key={o.id} {...o} />)}
          </div>
        </div>
      )}

      {activeTab === 'Payments' && (
        <div className="space-y-2">
          {obligations.filter(o => ['paid', 'validated'].includes(o.status)).map(o => <InvoiceCard key={o.id} {...o} />)}
          {obligations.filter(o => ['paid', 'validated'].includes(o.status)).length === 0 && (
            <div className="py-12 text-center text-sm text-muted-foreground">No payments recorded yet.</div>
          )}
        </div>
      )}

      {activeTab === 'Receipts' && (
        <div className="space-y-3">
          {obligations.filter(o => o.status === 'validated').map(o => (
            <div key={o.id} className="flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10"><Receipt className="h-4 w-4 text-success" /></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{o.concept}</p>
                <p className="text-xs text-muted-foreground">{o.id} · Validated</p>
              </div>
              <button className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                <Download className="h-3 w-3" /> Receipt
              </button>
            </div>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
