import { PageContainer } from '@/components/layout/PageContainer';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Users, UserCheck, ClipboardList, FolderOpen, Calendar, BookOpen } from 'lucide-react';

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

export function SecretaryDashboard() {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Secretary Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Admissions, enrollment and student management.</p>
      </div>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Students" value="2,635" icon={Users} variant="primary" />
        <StatsCard label="Pending Admissions" value="14" icon={UserCheck} />
        <StatsCard label="Active Enrollments" value="2,580" icon={ClipboardList} />
        <StatsCard label="Documents" value="342" icon={FolderOpen} />
      </div>
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <p className="text-sm text-muted-foreground">Administrative operations will be available here.</p>
      </div>
    </PageContainer>
  );
}

export function SecretaryAdmissions() { return <ShellPage title="Admissions" description="Process new student admissions." />; }
export function SecretaryEnrollments() { return <ShellPage title="Enrollments" description="Manage active enrollments." />; }
export function SecretaryStudents() { return <ShellPage title="Students" description="Student directory and records." />; }
export function SecretaryDocuments() { return <ShellPage title="Documents" description="Document generation and management." />; }
export function SecretaryClasses() { return <ShellPage title="Classes" description="Class configuration and setup." />; }
export function SecretarySchedule() { return <ShellPage title="Schedule" description="Academic schedule management." />; }
export function SecretaryRegularity() { return <ShellPage title="Regularity" description="Student regularity and compliance." />; }
