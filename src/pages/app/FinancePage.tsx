import { useState, useEffect } from 'react';
import { Wallet, TrendingUp, AlertTriangle, CheckCircle, Receipt, CreditCard, FileText, Download, Clock, XCircle, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/ui/section-header';
import { InvoiceCard } from '@/components/finance/InvoiceCard';
import { CategoryPill } from '@/components/knowledge/CategoryPill';
import { EmptyState } from '@/components/states/EmptyState';
import { LoadingState } from '@/components/states/LoadingState';
import type { PaymentStatus } from '@/components/finance/PaymentStatusBadge';

const tabs = ['Overview', 'Obligations', 'Payments', 'Receipts'];

interface FinanceItem {
  id: string;
  concept: string;
  amount: string;
  dueDate: string;
  status: PaymentStatus;
  student?: string;
  paidAmount?: string;
  paidDate?: string;
  category: 'obligation' | 'payment' | 'receipt';
}

const financeItems: FinanceItem[] = [
  { id: 'OBL-2025-001', concept: 'Tuition Fee — Term 2', amount: '$2,400', dueDate: 'Jul 15, 2025', status: 'pending', category: 'obligation' },
  { id: 'OBL-2025-002', concept: 'Lab Fee — Chemistry', amount: '$150', dueDate: 'Jun 30, 2025', status: 'due_soon', category: 'obligation' },
  { id: 'OBL-2024-018', concept: 'Library Fine', amount: '$25', dueDate: 'Jun 1, 2025', status: 'overdue', category: 'obligation' },
  { id: 'OBL-2025-003', concept: 'Sports Equipment Rental', amount: '$80', dueDate: 'Aug 1, 2025', status: 'pending', category: 'obligation' },
  { id: 'OBL-2025-004', concept: 'Field Trip — Biology', amount: '$60', dueDate: 'Jul 5, 2025', status: 'partial', paidAmount: '$30', category: 'obligation' },
  { id: 'OBL-2025-005', concept: 'Exam Re-sit Fee', amount: '$45', dueDate: 'Jul 20, 2025', status: 'under_review', category: 'obligation' },
  { id: 'OBL-2025-006', concept: 'Technology Fee', amount: '$120', dueDate: 'Jul 10, 2025', status: 'rejected', category: 'obligation' },
  { id: 'PAY-2025-011', concept: 'Tuition Fee — Term 1', amount: '$2,400', dueDate: 'Jan 15, 2025', status: 'validated', paidDate: 'Jan 12, 2025', category: 'payment' },
  { id: 'PAY-2024-042', concept: 'Registration Fee', amount: '$350', dueDate: 'Dec 1, 2024', status: 'validated', paidDate: 'Nov 28, 2024', category: 'payment' },
  { id: 'PAY-2025-012', concept: 'Lab Fee — Physics', amount: '$150', dueDate: 'Feb 15, 2025', status: 'paid', paidDate: 'Feb 10, 2025', category: 'payment' },
  { id: 'PAY-2025-013', concept: 'Student Activity Fee', amount: '$200', dueDate: 'Mar 1, 2025', status: 'validated', paidDate: 'Feb 28, 2025', category: 'payment' },
];

const summaryStats = {
  totalDue: '$2,880',
  totalPaid: '$3,100',
  overdue: '$25',
  pending: '$2,855',
  validated: '$2,750',
};

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, [activeTab]);

  const obligations = financeItems.filter(i => i.category === 'obligation');
  const payments = financeItems.filter(i => i.category === 'payment');
  const receipts = financeItems.filter(i => ['validated'].includes(i.status));

  const filteredObligations = statusFilter === 'all'
    ? obligations
    : obligations.filter(o => o.status === statusFilter);

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Finance</h1>
        <p className="mt-1 text-sm text-muted-foreground">Obligations, payments, validation status, and receipts.</p>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {tabs.map((tab) => (
          <CategoryPill key={tab} label={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)} />
        ))}
      </div>

      {loading ? (
        <LoadingState variant="detail" />
      ) : (
        <>
          {activeTab === 'Overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-2xl border border-border bg-card p-4 transition-all hover:shadow-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted"><Wallet className="h-4 w-4 text-muted-foreground" /></div>
                  <p className="mt-3 font-heading text-xl font-bold text-foreground">{summaryStats.totalDue}</p>
                  <p className="text-xs text-muted-foreground">Total Due</p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-4 transition-all hover:shadow-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/10"><CheckCircle className="h-4 w-4 text-success" /></div>
                  <p className="mt-3 font-heading text-xl font-bold text-foreground">{summaryStats.totalPaid}</p>
                  <p className="text-xs text-success">Total Paid</p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-4 transition-all hover:shadow-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/10"><AlertTriangle className="h-4 w-4 text-destructive" /></div>
                  <p className="mt-3 font-heading text-xl font-bold text-destructive">{summaryStats.overdue}</p>
                  <p className="text-xs text-destructive">Overdue</p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-4 transition-all hover:shadow-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning/10"><Clock className="h-4 w-4 text-warning" /></div>
                  <p className="mt-3 font-heading text-xl font-bold text-foreground">{summaryStats.pending}</p>
                  <p className="text-xs text-warning">Pending</p>
                </div>
              </div>

              <div className="rounded-2xl bg-surface-dark p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-surface-dark-foreground/60">Current Account Balance</p>
                    <p className="mt-1 font-heading text-2xl font-bold text-surface-dark-foreground">-$2,880.00</p>
                  </div>
                  <button className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors active:scale-[0.97]">
                    <CreditCard className="mr-1.5 inline h-4 w-4" />Make Payment
                  </button>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 border-t border-surface-dark-foreground/10 pt-4">
                  <div className="flex items-center gap-2">
                    <ArrowDownLeft className="h-3.5 w-3.5 text-success" />
                    <div>
                      <p className="text-xs text-surface-dark-foreground/50">Last payment</p>
                      <p className="text-sm font-medium text-surface-dark-foreground">$200 · Feb 28</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowUpRight className="h-3.5 w-3.5 text-warning" />
                    <div>
                      <p className="text-xs text-surface-dark-foreground/50">Next due</p>
                      <p className="text-sm font-medium text-surface-dark-foreground">$150 · Jun 30</p>
                    </div>
                  </div>
                </div>
              </div>

              {obligations.some(o => o.status === 'overdue' || o.status === 'rejected') && (
                <div className="space-y-2">
                  {obligations.filter(o => o.status === 'overdue').map(o => (
                    <div key={o.id} className="flex items-center gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-3 transition-all hover:border-destructive/30">
                      <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
                      <p className="flex-1 text-sm text-foreground"><strong>{o.concept}</strong> — {o.amount} overdue since {o.dueDate}</p>
                      <button className="shrink-0 rounded-lg bg-destructive px-3 py-1.5 text-xs font-medium text-destructive-foreground hover:bg-destructive/90 transition-colors active:scale-95">Pay Now</button>
                    </div>
                  ))}
                  {obligations.filter(o => o.status === 'rejected').map(o => (
                    <div key={o.id} className="flex items-center gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-3 transition-all hover:border-destructive/30">
                      <XCircle className="h-4 w-4 text-destructive shrink-0" />
                      <p className="flex-1 text-sm text-foreground"><strong>{o.concept}</strong> — Payment rejected. Please retry.</p>
                      <button className="shrink-0 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors active:scale-95">Retry</button>
                    </div>
                  ))}
                </div>
              )}

              <div>
                <SectionHeader title="Active Obligations" subtitle={`${obligations.filter(o => !['paid', 'validated'].includes(o.status)).length} items`} action={<button onClick={() => setActiveTab('Obligations')} className="text-xs font-medium text-primary hover:underline">View All</button>} />
                <div className="mt-3 space-y-2">
                  {obligations.filter(o => !['paid', 'validated'].includes(o.status)).slice(0, 4).map((o) => (
                    <InvoiceCard key={o.id} {...o} />
                  ))}
                </div>
              </div>

              <div>
                <SectionHeader title="Recent Payments" subtitle={`${payments.length} payments`} action={<button onClick={() => setActiveTab('Payments')} className="text-xs font-medium text-primary hover:underline">View All</button>} />
                <div className="mt-3 space-y-2">
                  {payments.slice(0, 3).map((o) => (
                    <InvoiceCard key={o.id} {...o} />
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5">
                <SectionHeader title="Payment Timeline" subtitle="Recent transactions" />
                <div className="mt-4 space-y-0">
                  {[...payments].reverse().map((p, i) => (
                    <div key={p.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-success" />
                        {i < payments.length - 1 && <div className="w-px flex-1 bg-border" />}
                      </div>
                      <div className="pb-4">
                        <p className="text-sm font-medium text-foreground">{p.concept} — {p.amount}</p>
                        <p className="text-xs text-muted-foreground">{p.paidDate} · {p.id}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Obligations' && (
            <div className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                {['all', 'pending', 'due_soon', 'overdue', 'partial', 'under_review', 'rejected'].map(s => (
                  <CategoryPill key={s} label={s === 'all' ? 'All' : s.replace(/_/g, ' ')} active={statusFilter === s} onClick={() => setStatusFilter(s)} />
                ))}
              </div>
              <div className="space-y-2">
                {filteredObligations.map(o => <InvoiceCard key={o.id} {...o} />)}
                {filteredObligations.length === 0 && (
                  <EmptyState title="No obligations found" description="No items match the selected filter." />
                )}
              </div>
            </div>
          )}

          {activeTab === 'Payments' && (
            <div className="space-y-2">
              {payments.length > 0 ? (
                payments.map(o => <InvoiceCard key={o.id} {...o} />)
              ) : (
                <EmptyState icon={CreditCard} title="No payments yet" description="Your completed payments will appear here." />
              )}
            </div>
          )}

          {activeTab === 'Receipts' && (
            <div className="space-y-3">
              {receipts.length > 0 ? (
                receipts.map(o => (
                  <div key={o.id} className="flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-3.5 transition-all hover:shadow-sm hover:border-primary/10">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10"><Receipt className="h-4 w-4 text-success" /></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{o.concept}</p>
                      <p className="text-xs text-muted-foreground">{o.id} · Validated {o.paidDate}</p>
                    </div>
                    <span className="font-heading text-sm font-bold text-foreground">{o.amount}</span>
                    <button className="flex items-center gap-1 rounded-lg bg-muted px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted/80 transition-colors active:scale-95">
                      <Download className="h-3 w-3" /> Receipt
                    </button>
                  </div>
                ))
              ) : (
                <EmptyState icon={Receipt} title="No receipts available" description="Validated payment receipts will appear here." />
              )}
            </div>
          )}
        </>
      )}
    </PageContainer>
  );
}
