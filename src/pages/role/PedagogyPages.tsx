import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/ui/section-header';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { BarChart3, Users, CheckCircle, AlertTriangle, Calendar, FileText, BookOpen, UserCheck } from 'lucide-react';

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

export function PedagogyDashboard() {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Academic Coordination</h1>
        <p className="mt-1 text-sm text-muted-foreground">Overview of academic operations and student performance.</p>
      </div>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Students" value="2,635" icon={Users} variant="primary" />
        <StatsCard label="Attendance" value="91%" icon={CheckCircle} />
        <StatsCard label="At Risk" value="23" icon={AlertTriangle} />
        <StatsCard label="Teachers" value="29" icon={UserCheck} />
      </div>
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <p className="text-sm text-muted-foreground">Academic analytics and reporting will be available here.</p>
      </div>
    </PageContainer>
  );
}

export function PedagogyAnalytics() { return <ShellPage title="Analytics" description="Student performance analytics and trends." />; }
export function PedagogyClasses() { return <ShellPage title="Classes" description="Manage class groups and configurations." />; }
export function PedagogyTeachers() { return <ShellPage title="Teachers" description="Teacher management and assignments." />; }
export function PedagogyAttendance() { return <ShellPage title="Attendance" description="Institution-wide attendance overview." />; }
export function PedagogySchedule() { return <ShellPage title="Schedule" description="Academic schedule management." />; }
export function PedagogyRisk() { return <ShellPage title="Risk Management" description="Students at academic risk." />; }
export function PedagogyReports() { return <ShellPage title="Reports" description="Generate academic reports." />; }
