import { PageContainer } from '@/components/layout/PageContainer';

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

export { GuardianDashboard } from '@/pages/app/RoleDashboards';
export function GuardianStudents() { return <ShellPage title="My Students" description="Monitor your children's academic progress." />; }
export function GuardianPerformance() { return <ShellPage title="Performance" description="Detailed academic performance analysis." />; }
export function GuardianAttendance() { return <ShellPage title="Attendance" description="Attendance records for your children." />; }
export function GuardianSchedule() { return <ShellPage title="Schedule" description="Class schedule and academic calendar." />; }
export function GuardianFinance() { return <ShellPage title="Finance" description="Financial overview and pending obligations." />; }
export function GuardianPayments() { return <ShellPage title="Payments" description="Make and track payments." />; }
export function GuardianDocuments() { return <ShellPage title="Documents" description="Academic documents and certificates." />; }
export function GuardianChat() { return <ShellPage title="Chat" description="Communicate with teachers and staff." />; }
export function GuardianNotifications() { return <ShellPage title="Notifications" description="Alerts and important updates." />; }
