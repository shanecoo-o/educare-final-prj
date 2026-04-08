import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/ui/section-header';

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

/* ─── Student pages ─── */
export { StudentDashboard } from '@/pages/app/RoleDashboards';
export function StudentGrades() { return <ShellPage title="My Grades" description="View your academic performance across all subjects." />; }
export function StudentAttendance() { return <ShellPage title="Attendance" description="Track your attendance record." />; }
export function StudentSchedule() { return <ShellPage title="Schedule" description="Your class schedule and calendar." />; }
export function StudentAgenda() { return <ShellPage title="Agenda" description="Personal agenda and reminders." />; }
export function StudentKnowledge() { return <ShellPage title="Knowledge Space" description="Access learning materials and resources." />; }
export function StudentFeed() { return <ShellPage title="Feed" description="Latest updates from your institution." />; }
export function StudentChat() { return <ShellPage title="Chat" description="Messages with teachers and classmates." />; }
export function StudentNotifications() { return <ShellPage title="Notifications" description="Your alerts and notifications." />; }
export function StudentFinance() { return <ShellPage title="My Finances" description="View your fees, payments and receipts." />; }
