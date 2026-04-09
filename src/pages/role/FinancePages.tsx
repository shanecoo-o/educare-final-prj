import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/ui/section-header';
import { StatusBadge } from '@/components/ui/status-badge';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { AlertCard } from '@/components/dashboard/AlertCard';
import { QuickActionCard } from '@/components/dashboard/QuickActionCard';
import { InvoiceCard } from '@/components/finance/InvoiceCard';
import {
  payments, obligations, financeAccounts, financeStats, students
} from '@/data/mockData';
import {
  Wallet, CheckCircle, AlertTriangle, Clock, FileText, BarChart3,
  Users, Receipt, Banknote, TrendingUp, ArrowDownRight, ArrowUpRight,
  Filter, Download, Search
} from 'lucide-react';
import { cn } from '@/lib/utils';

export { FinanceDashboard } from '@/pages/app/RoleDashboards';

/* ─── PAYMENTS ─── */
export function FinancePayments() {
  const sorted = [...payments].sort((a, b) => {
    const order = { overdue: 0, under_review: 1, partial: 2, pending: 3, rejected: 4, paid: 5, validated: 6 };
    return (order[a.status] ?? 9) - (order[b.status] ?? 9);
  });

  return (
    <PageContainer>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Payments</h1>
          <p className="mt-1 text-sm text-muted-foreground">Track and manage all payment transactions.</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-muted px-3 py-2 text-xs font-medium text-foreground hover:bg-muted/80 transition-colors">
          <Filter className="h-3.5 w-3.5" />
          Filter
        </button>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Total" value={payments.length} icon={FileText} variant="primary" />
        <StatsCard label="Pending Review" value={financeStats.pendingValidation} icon={Clock} />
        <StatsCard label="Overdue" value={payments.filter(p => p.status === 'overdue').length} icon={AlertTriangle} />
        <StatsCard label="Validated" value={payments.filter(p => p.status === 'validated').length} icon={CheckCircle} />
      </div>

      <div className="space-y-1.5">
        {sorted.map(p => (
          <InvoiceCard
            key={p.id}
            id={p.id}
            concept={`${p.studentName} — ${p.concept}`}
            amount={`$${p.amount.toLocaleString()}`}
            dueDate={new Date(p.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            status={p.status as any}
            paidAmount={p.paidAmount > 0 ? `$${p.paidAmount.toLocaleString()}` : undefined}
            paidDate={p.paidDate ? new Date(p.paidDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : undefined}
          />
        ))}
      </div>
    </PageContainer>
  );
}

/* ─── VALIDATION ─── */
export function FinanceValidation() {
  const pendingValidation = payments.filter(p => p.status === 'under_review');

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Payment Validation</h1>
        <p className="mt-1 text-sm text-muted-foreground">Validate pending payment submissions.</p>
      </div>

      {pendingValidation.length > 0 && (
        <AlertCard title={`${pendingValidation.length} payment(s) awaiting validation`} description="Review and confirm or reject submitted payments." variant="info" action="Batch Validate" className="mb-6" />
      )}

      <div className="space-y-2">
        {pendingValidation.map(p => (
          <div key={p.id} className="rounded-xl border border-info/20 bg-info/[0.02] p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm font-medium text-foreground">{p.studentName} — {p.concept}</p>
                <p className="text-xs text-muted-foreground">{p.reference} · {p.method} · Submitted {p.paidDate && new Date(p.paidDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
              </div>
              <span className="font-heading text-base font-bold text-foreground">${p.paidAmount.toLocaleString()}</span>
            </div>
            <div className="flex gap-2">
              <button className="rounded-lg bg-success px-3 py-1.5 text-xs font-medium text-success-foreground hover:bg-success/90 transition-colors active:scale-95">
                <CheckCircle className="h-3 w-3 inline mr-1" />Validate
              </button>
              <button className="rounded-lg bg-destructive px-3 py-1.5 text-xs font-medium text-destructive-foreground hover:bg-destructive/90 transition-colors active:scale-95">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

/* ─── OBLIGATIONS ─── */
export function FinanceObligations() {
  const statusVariant = (s: string) => s === 'paid' ? 'success' as const : s === 'overdue' ? 'destructive' as const : 'muted' as const;

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Obligations</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage student financial obligations.</p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Active" value={obligations.filter(o => o.status === 'active').length} icon={FileText} variant="primary" />
        <StatsCard label="Overdue" value={obligations.filter(o => o.status === 'overdue').length} icon={AlertTriangle} />
        <StatsCard label="Paid" value={obligations.filter(o => o.status === 'paid').length} icon={CheckCircle} />
        <StatsCard label="Total Value" value={`$${obligations.reduce((s, o) => s + o.amount, 0).toLocaleString()}`} icon={Wallet} />
      </div>

      <div className="space-y-1.5">
        {obligations.map(o => (
          <div key={o.id} className={cn('flex items-center gap-3 rounded-xl border bg-card px-4 py-3', o.status === 'overdue' ? 'border-destructive/20' : 'border-border')}>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{o.concept}</p>
              <p className="text-xs text-muted-foreground">{o.studentName} · {o.category} · Due {new Date(o.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
            </div>
            <span className="font-heading text-sm font-bold text-foreground">${o.amount.toLocaleString()}</span>
            <StatusBadge label={o.status} variant={statusVariant(o.status)} dot />
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

/* ─── ACCOUNTS ─── */
export function FinanceAccounts() {
  const statusVariant = (s: string) => s === 'paid_up' ? 'success' as const : s === 'delinquent' ? 'destructive' as const : 'muted' as const;

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Student Accounts</h1>
        <p className="mt-1 text-sm text-muted-foreground">Individual student financial accounts.</p>
      </div>

      <div className="space-y-2">
        {financeAccounts.map(a => (
          <div key={a.id} className="rounded-xl border border-border bg-card p-4 hover:shadow-sm transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted font-heading text-xs font-bold">{a.studentName.split(' ').map(n => n[0]).join('')}</div>
                <div>
                  <p className="text-sm font-medium text-foreground">{a.studentName}</p>
                  <p className="text-xs text-muted-foreground">{a.studentId}{a.lastPayment && ` · Last payment: ${new Date(a.lastPayment).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}</p>
                </div>
              </div>
              <StatusBadge label={a.status.replace('_', ' ')} variant={statusVariant(a.status)} dot />
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3">
              <div className="rounded-lg bg-muted/50 p-2 text-center">
                <p className="text-[10px] text-muted-foreground">Due</p>
                <p className="font-heading text-sm font-bold text-foreground">${a.totalDue.toLocaleString()}</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-2 text-center">
                <p className="text-[10px] text-muted-foreground">Paid</p>
                <p className="font-heading text-sm font-bold text-success">${a.totalPaid.toLocaleString()}</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-2 text-center">
                <p className="text-[10px] text-muted-foreground">Balance</p>
                <p className={cn('font-heading text-sm font-bold', a.balance > 0 ? 'text-warning' : 'text-success')}>${a.balance.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

/* ─── RECEIPTS ─── */
export function FinanceReceipts() {
  const paidPayments = payments.filter(p => ['paid', 'validated'].includes(p.status));

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Receipts</h1>
        <p className="mt-1 text-sm text-muted-foreground">Generate and manage payment receipts.</p>
      </div>

      <div className="space-y-1.5">
        {paidPayments.map(p => (
          <div key={p.id} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
            <Receipt className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{p.studentName} — {p.concept}</p>
              <p className="text-xs text-muted-foreground">{p.reference} · {p.method} · {p.paidDate && new Date(p.paidDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>
            <span className="font-heading text-sm font-bold text-foreground">${p.paidAmount.toLocaleString()}</span>
            <button className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted/80 transition-colors active:scale-95">
              <Download className="h-3 w-3 inline mr-1" />PDF
            </button>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

/* ─── PENALTIES ─── */
export function FinancePenalties() {
  const overduePayments = payments.filter(p => p.status === 'overdue');

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Penalties</h1>
        <p className="mt-1 text-sm text-muted-foreground">Late fees and penalty management.</p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3">
        <StatsCard label="Overdue Items" value={overduePayments.length} icon={AlertTriangle} variant="primary" />
        <StatsCard label="Total Overdue" value={`$${financeStats.totalOverdue.toLocaleString()}`} icon={Wallet} />
      </div>

      <div className="space-y-1.5">
        {overduePayments.map(p => (
          <div key={p.id} className="flex items-center gap-3 rounded-xl border border-destructive/20 bg-destructive/[0.02] px-4 py-3">
            <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{p.studentName} — {p.concept}</p>
              <p className="text-xs text-destructive">Due {new Date(p.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {Math.floor((Date.now() - new Date(p.dueDate).getTime()) / 86400000)} days overdue</p>
            </div>
            <span className="font-heading text-sm font-bold text-destructive">${p.amount.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

/* ─── TREASURY ─── */
export function FinanceTreasury() {
  const totalInflow = payments.filter(p => ['paid', 'validated'].includes(p.status)).reduce((s, p) => s + p.paidAmount, 0);
  const totalOutstanding = payments.filter(p => ['pending', 'overdue', 'partial'].includes(p.status)).reduce((s, p) => s + (p.amount - p.paidAmount), 0);

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Treasury</h1>
        <p className="mt-1 text-sm text-muted-foreground">Cash flow and treasury operations.</p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Total Inflow" value={`$${totalInflow.toLocaleString()}`} icon={ArrowDownRight} variant="primary" trend="+12% vs last month" trendUp />
        <StatsCard label="Outstanding" value={`$${totalOutstanding.toLocaleString()}`} icon={Clock} />
        <StatsCard label="Overdue" value={`$${financeStats.totalOverdue.toLocaleString()}`} icon={AlertTriangle} />
        <StatsCard label="Collection Rate" value="68%" icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <SectionHeader title="Monthly Summary" />
          <div className="mt-4 space-y-3">
            {[
              { month: 'April 2026', inflow: 5200, outflow: 0 },
              { month: 'March 2026', inflow: 8400, outflow: 1200 },
              { month: 'February 2026', inflow: 3750, outflow: 800 },
              { month: 'January 2026', inflow: 12800, outflow: 500 },
            ].map((m, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-muted/30 transition-colors">
                <span className="text-sm font-medium text-foreground">{m.month}</span>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-xs font-medium text-success"><ArrowDownRight className="h-3 w-3" />${m.inflow.toLocaleString()}</span>
                  {m.outflow > 0 && <span className="flex items-center gap-1 text-xs font-medium text-destructive"><ArrowUpRight className="h-3 w-3" />${m.outflow.toLocaleString()}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <SectionHeader title="Key Metrics" />
          <div className="mt-4 space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs text-muted-foreground">Collection Rate</span>
                <span className="text-xs font-medium text-foreground">68%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted"><div className="h-2 rounded-full bg-primary" style={{ width: '68%' }} /></div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs text-muted-foreground">On-Time Payment Rate</span>
                <span className="text-xs font-medium text-foreground">82%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted"><div className="h-2 rounded-full bg-success" style={{ width: '82%' }} /></div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs text-muted-foreground">Delinquency Rate</span>
                <span className="text-xs font-medium text-foreground">8%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted"><div className="h-2 rounded-full bg-destructive" style={{ width: '8%' }} /></div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

/* ─── REPORTS ─── */
export function FinanceReports() {
  const reports = [
    { name: 'Monthly Revenue Report', period: 'April 2026', generated: 'Auto', status: 'ready' },
    { name: 'Overdue Accounts Report', period: 'Q1 2026', generated: 'Manual', status: 'ready' },
    { name: 'Collection Summary', period: 'March 2026', generated: 'Auto', status: 'ready' },
    { name: 'Student Account Statements', period: 'Term 2', generated: 'On-demand', status: 'pending' },
    { name: 'Annual Financial Summary', period: '2025-2026', generated: 'Scheduled', status: 'pending' },
  ];

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Reports</h1>
        <p className="mt-1 text-sm text-muted-foreground">Financial reports and analytics.</p>
      </div>

      <div className="space-y-1.5">
        {reports.map((r, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm transition-all">
            <BarChart3 className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{r.name}</p>
              <p className="text-xs text-muted-foreground">{r.period} · {r.generated}</p>
            </div>
            <StatusBadge label={r.status} variant={r.status === 'ready' ? 'success' : 'muted'} />
            {r.status === 'ready' && (
              <button className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted/80 transition-colors active:scale-95">
                <Download className="h-3 w-3 inline mr-1" />Export
              </button>
            )}
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
