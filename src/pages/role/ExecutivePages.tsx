import { PageContainer } from '@/components/layout/PageContainer';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Users, Wallet, GraduationCap, BarChart3, Shield, FileText } from 'lucide-react';

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

export function ExecutiveDashboard() {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Executive Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Institutional overview and strategic indicators.</p>
      </div>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Students" value="2,635" icon={Users} variant="primary" />
        <StatsCard label="Revenue" value="$485K" icon={Wallet} />
        <StatsCard label="Retention" value="94%" icon={GraduationCap} />
        <StatsCard label="Growth" value="+12%" icon={BarChart3} />
      </div>
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <p className="text-sm text-muted-foreground">Executive reports and institutional analytics will be available here.</p>
      </div>
    </PageContainer>
  );
}

export function ExecutiveFinance() { return <ShellPage title="Finance Overview" description="High-level financial summary." />; }
export function ExecutiveAcademic() { return <ShellPage title="Academic Overview" description="Institutional academic performance." />; }
export function ExecutiveEnrollment() { return <ShellPage title="Enrollment" description="Enrollment statistics and trends." />; }
export function ExecutiveReports() { return <ShellPage title="Reports" description="Strategic reports and analytics." />; }
export function ExecutiveAudit() { return <ShellPage title="Audit" description="System audit logs and compliance." />; }
