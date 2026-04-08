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

export { TeacherDashboard } from '@/pages/app/RoleDashboards';
export function TeacherSchedule() { return <ShellPage title="Schedule" description="Your teaching schedule." />; }
export function TeacherClasses() { return <ShellPage title="Classes" description="Manage your classes and students." />; }
export function TeacherAttendance() { return <ShellPage title="Attendance" description="Record and review student attendance." />; }
export function TeacherAssessments() { return <ShellPage title="Assessments" description="Create and manage evaluations." />; }
export function TeacherGradebook() { return <ShellPage title="Gradebook" description="Enter and review student grades." />; }
export function TeacherKnowledge() { return <ShellPage title="Knowledge Space" description="Publish learning materials." />; }
export function TeacherChat() { return <ShellPage title="Chat" description="Messages with students and staff." />; }
export function TeacherNotifications() { return <ShellPage title="Notifications" description="Your alerts and notifications." />; }
