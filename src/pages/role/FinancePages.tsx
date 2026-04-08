import { PageContainer } from '@/components/layout/PageContainer';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { AlertCard } from '@/components/dashboard/AlertCard';
import { QuickActionCard } from '@/components/dashboard/QuickActionCard';
import { SectionHeader } from '@/components/ui/section-header';
import { Wallet, CheckCircle, AlertTriangle, Clock, FileText, BarChart3, Users, Receipt, Banknote } from 'lucide-react';

function ShellPage({ title, description }: { title: string; description: string }) {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <p className="text-sm text-muted-foreground">This module is under development.</p>
      </div>
    </PageContainer>
  );
}

export function FinanceDashboard() {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Finance Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">COREOS — Financial operations overview.</p>
      </div>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Total Pending" value="$48,500" icon={Clock} variant="primary" />
        <StatsCard label="Validated" value="$32,200" icon={CheckCircle} trend="+8% this month" trendUp />
        <StatsCard label="Overdue" value="$3,800" icon={AlertTriangle} />
        <StatsCard label="Today's Payments" value="12" icon={Wallet} />
      </div>
      <div className="mb-6 space-y-2">
        <AlertCard title="$3,800 overdue across 15 students" description="Overdue items require immediate follow-up." variant="destructive" action="Review" />
        <AlertCard title="8 payments pending validation" description="Batch validation available for today's submissions." variant="info" action="Validate" />
      </div>
      <SectionHeader title="Quick Actions" />
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <QuickActionCard icon={CheckCircle} label="Batch Validate" />
        <QuickActionCard icon={FileText} label="Generate Report" />
        <QuickActionCard icon={AlertTriangle} label="Overdue List" />
        <QuickActionCard icon={Wallet} label="Payment Log" />
      </div>
    </PageContainer>
  );
}

export function FinancePayments() { return <ShellPage title="Payments" description="Track and manage all payment transactions." />; }
export function FinanceValidation() { return <ShellPage title="Validation" description="Validate pending payment submissions." />; }
export function FinanceObligations() { return <ShellPage title="Obligations" description="Manage student financial obligations." />; }
export function FinanceAccounts() { return <ShellPage title="Student Accounts" description="Individual student financial accounts." />; }
export function FinanceReceipts() { return <ShellPage title="Receipts" description="Generate and manage payment receipts." />; }
export function FinancePenalties() { return <ShellPage title="Penalties" description="Late fees and penalty management." />; }
export function FinanceTreasury() { return <ShellPage title="Treasury" description="Cash flow and treasury operations." />; }
export function FinanceReports() { return <ShellPage title="Reports" description="Financial reports and analytics." />; }
