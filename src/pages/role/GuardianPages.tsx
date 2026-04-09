import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/ui/section-header';
import { ScheduleView } from '@/components/academic/ScheduleView';
import { StatusBadge } from '@/components/ui/status-badge';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { AlertCard } from '@/components/dashboard/AlertCard';
import {
  students, weeklySchedule, payments, attendanceRecords, grades, getSubjectAverage, subjects
} from '@/data/mockData';
import {
  Users, TrendingUp, CheckCircle, Wallet, Clock, FileText,
  MessageCircle, Bell, GraduationCap, Download
} from 'lucide-react';
import { cn } from '@/lib/utils';

const linkedStudents = [students[0], students[3]]; // John Smith, Sarah Johnson
const studentPayments = payments.filter(p => ['STU-001', 'STU-004'].includes(p.studentId));

export { GuardianDashboard } from '@/pages/app/RoleDashboards';

/* ─── STUDENTS ─── */
export function GuardianStudents() {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">My Students</h1>
        <p className="mt-1 text-sm text-muted-foreground">Monitor your children's academic progress.</p>
      </div>

      <div className="space-y-4">
        {linkedStudents.map(s => {
          const studentGrades = grades.filter(g => g.studentId === s.id);
          const recentGrades = studentGrades.slice(0, 3);
          const sPayments = payments.filter(p => p.studentId === s.id && ['pending', 'overdue'].includes(p.status));
          const totalDue = sPayments.reduce((sum, p) => sum + (p.amount - p.paidAmount), 0);

          return (
            <div key={s.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-4 mb-4">
                <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl font-heading text-base font-bold', s.status === 'excellent' ? 'bg-success/10 text-success' : s.status === 'at_risk' ? 'bg-warning/10 text-warning' : 'bg-primary/10 text-primary')}>
                  {s.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-heading text-base font-semibold text-foreground">{s.name}</p>
                  <p className="text-xs text-muted-foreground">Grade {s.grade}{s.section} · {s.id}</p>
                </div>
                <StatusBadge label={s.status === 'excellent' ? 'Excellent' : s.status === 'at_risk' ? 'At Risk' : 'Active'} variant={s.status === 'excellent' ? 'success' : s.status === 'at_risk' ? 'warning' : 'primary'} dot />
              </div>

              <div className="grid grid-cols-4 gap-3 mb-4">
                <div className="text-center">
                  <p className="font-heading text-lg font-bold text-foreground">{s.gpa.toFixed(1)}</p>
                  <p className="text-[10px] text-muted-foreground">GPA</p>
                </div>
                <div className="text-center">
                  <p className="font-heading text-lg font-bold text-foreground">{s.attendanceRate}%</p>
                  <p className="text-[10px] text-muted-foreground">Attendance</p>
                </div>
                <div className="text-center">
                  <p className="font-heading text-lg font-bold text-foreground">{studentGrades.length}</p>
                  <p className="text-[10px] text-muted-foreground">Grades</p>
                </div>
                <div className="text-center">
                  <p className={cn('font-heading text-lg font-bold', totalDue > 0 ? 'text-warning' : 'text-success')}>${totalDue.toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground">Due</p>
                </div>
              </div>

              {recentGrades.length > 0 && (
                <div className="space-y-1">
                  {recentGrades.map(g => (
                    <div key={g.id} className="flex items-center justify-between rounded-lg px-3 py-2 bg-muted/30">
                      <span className="text-xs text-foreground">{g.subjectName} — {g.evaluation}</span>
                      <span className="font-heading text-xs font-bold text-foreground">{g.score}/{g.maxScore}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </PageContainer>
  );
}

/* ─── PERFORMANCE ─── */
export function GuardianPerformance() {
  const s = linkedStudents[0];
  const subjectAverages = subjects.map(sub => ({
    name: sub.name,
    average: getSubjectAverage(s.id, sub.id),
  })).filter(s => s.average > 0);

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Performance</h1>
        <p className="mt-1 text-sm text-muted-foreground">{s.name}'s academic performance analysis.</p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="GPA" value={s.gpa.toFixed(1)} icon={TrendingUp} variant="primary" />
        <StatsCard label="Attendance" value={`${s.attendanceRate}%`} icon={CheckCircle} />
        <StatsCard label="Best Subject" value="Math II" icon={GraduationCap} />
        <StatsCard label="Weakest" value="Biology" icon={Clock} trend="Needs support" />
      </div>

      <SectionHeader title="Subject Averages" className="mb-3" />
      <div className="space-y-2">
        {subjectAverages.map((sub, i) => (
          <div key={i} className="rounded-xl border border-border bg-card px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">{sub.name}</span>
              <span className="font-heading text-sm font-bold text-foreground">{sub.average}/20</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted">
              <div className={cn('h-1.5 rounded-full', sub.average >= 14 ? 'bg-success' : sub.average >= 10 ? 'bg-warning' : 'bg-destructive')} style={{ width: `${(sub.average / 20) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

/* ─── ATTENDANCE ─── */
export function GuardianAttendance() {
  const s = linkedStudents[0];
  const records = attendanceRecords.filter(a => a.studentId === s.id);
  const statusVariant = (st: string) => st === 'present' ? 'success' as const : st === 'absent' ? 'destructive' as const : st === 'late' ? 'warning' as const : 'info' as const;

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Attendance</h1>
        <p className="mt-1 text-sm text-muted-foreground">{s.name}'s attendance records.</p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Rate" value={`${s.attendanceRate}%`} icon={CheckCircle} variant="primary" />
        <StatsCard label="Present" value={records.filter(r => r.status === 'present').length} icon={CheckCircle} />
        <StatsCard label="Absent" value={records.filter(r => r.status === 'absent').length} icon={Clock} />
        <StatsCard label="Late" value={records.filter(r => r.status === 'late').length} icon={Clock} />
      </div>

      <SectionHeader title="Recent Records" className="mb-3" />
      <div className="space-y-1.5">
        {records.map(r => (
          <div key={r.id} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
            <div className="w-20 shrink-0">
              <p className="text-xs font-medium text-foreground">{new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
            </div>
            <div className="flex-1">
              <p className="text-sm text-foreground">{r.subject}</p>
              {r.note && <p className="text-xs text-muted-foreground">{r.note}</p>}
            </div>
            <StatusBadge label={r.status} variant={statusVariant(r.status)} dot />
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

/* ─── SCHEDULE ─── */
export function GuardianSchedule() {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Schedule</h1>
        <p className="mt-1 text-sm text-muted-foreground">{linkedStudents[0].name}'s class schedule.</p>
      </div>
      <ScheduleView schedule={weeklySchedule} showTeacher />
    </PageContainer>
  );
}

/* ─── FINANCE ─── */
export function GuardianFinance() {
  const pending = studentPayments.filter(p => ['pending', 'overdue', 'partial'].includes(p.status));
  const totalDue = pending.reduce((s, p) => s + (p.amount - p.paidAmount), 0);
  const statusVariant = (s: string) => s === 'overdue' ? 'destructive' as const : s === 'partial' ? 'warning' as const : 'muted' as const;

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Finance</h1>
        <p className="mt-1 text-sm text-muted-foreground">Financial overview and pending obligations.</p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatsCard label="Total Due" value={`$${totalDue.toLocaleString()}`} icon={Wallet} variant="primary" />
        <StatsCard label="Overdue" value={`$${pending.filter(p => p.status === 'overdue').reduce((s, p) => s + p.amount, 0).toLocaleString()}`} icon={Clock} />
        <StatsCard label="Students" value={linkedStudents.length} icon={Users} />
      </div>

      {pending.some(p => p.status === 'overdue') && (
        <AlertCard title="Overdue payments require attention" description="Some fees are past due. Please review and settle them." variant="destructive" className="mb-4" />
      )}

      <SectionHeader title="Pending Obligations" className="mb-3" />
      <div className="space-y-1.5">
        {pending.map(p => (
          <div key={p.id} className={cn('flex items-center gap-3 rounded-xl border bg-card px-4 py-3', p.status === 'overdue' ? 'border-destructive/20' : 'border-border')}>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{p.concept}</p>
              <p className="text-xs text-muted-foreground">{p.studentName} · Due {new Date(p.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
            </div>
            <span className={cn('font-heading text-sm font-bold', p.status === 'overdue' ? 'text-destructive' : 'text-foreground')}>${p.amount.toLocaleString()}</span>
            <StatusBadge label={p.status} variant={statusVariant(p.status)} />
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

/* ─── PAYMENTS ─── */
export function GuardianPayments() {
  const allPayments = studentPayments.sort((a, b) => (b.paidDate || b.dueDate).localeCompare(a.paidDate || a.dueDate));
  const statusVariant = (s: string) => s === 'paid' || s === 'validated' ? 'success' as const : s === 'overdue' ? 'destructive' as const : s === 'under_review' ? 'info' as const : s === 'rejected' ? 'destructive' as const : 'muted' as const;

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Payments</h1>
        <p className="mt-1 text-sm text-muted-foreground">Make and track payments.</p>
      </div>

      <div className="space-y-1.5">
        {allPayments.map(p => (
          <div key={p.id} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{p.concept}</p>
              <p className="text-xs text-muted-foreground">
                {p.studentName} · {p.paidDate ? `Paid ${new Date(p.paidDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` : `Due ${new Date(p.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                {p.reference && ` · ${p.reference}`}
              </p>
            </div>
            <span className="font-heading text-sm font-bold text-foreground">${p.amount.toLocaleString()}</span>
            <StatusBadge label={p.status} variant={statusVariant(p.status)} />
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

/* ─── DOCUMENTS ─── */
export function GuardianDocuments() {
  const docs = [
    { name: 'Report Card — Term 1', student: 'John Smith', date: 'Jan 2026', type: 'report' },
    { name: 'Enrollment Certificate', student: 'John Smith', date: 'Sep 2025', type: 'certificate' },
    { name: 'Report Card — Term 1', student: 'Sarah Johnson', date: 'Jan 2026', type: 'report' },
    { name: 'Medical Form', student: 'John Smith', date: 'Aug 2025', type: 'form' },
    { name: 'Enrollment Certificate', student: 'Sarah Johnson', date: 'Sep 2025', type: 'certificate' },
  ];

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Documents</h1>
        <p className="mt-1 text-sm text-muted-foreground">Academic documents and certificates.</p>
      </div>
      <div className="space-y-1.5">
        {docs.map((d, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm transition-all cursor-pointer">
            <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{d.name}</p>
              <p className="text-xs text-muted-foreground">{d.student} · {d.date}</p>
            </div>
            <Download className="h-4 w-4 text-muted-foreground" />
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

/* ─── CHAT ─── */
export function GuardianChat() {
  const conversations = [
    { name: 'Dr. Alan Smith', lastMessage: 'John is doing well in Math', time: '2h ago', unread: 1 },
    { name: 'Dr. David Park', lastMessage: 'Biology requires more attention', time: '1d ago', unread: 0 },
    { name: 'Secretary Office', lastMessage: 'Document request processed', time: '3d ago', unread: 0 },
  ];

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Chat</h1>
        <p className="mt-1 text-sm text-muted-foreground">Communicate with teachers and staff.</p>
      </div>
      <div className="space-y-1.5">
        {conversations.map((c, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm hover:border-primary/10 transition-all cursor-pointer active:scale-[0.995]">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-heading text-sm font-bold text-primary">{c.name[0]}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{c.name}</p>
              <p className="text-xs text-muted-foreground truncate">{c.lastMessage}</p>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span className="text-[10px] text-muted-foreground">{c.time}</span>
              {c.unread > 0 && <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">{c.unread}</span>}
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

/* ─── NOTIFICATIONS ─── */
export function GuardianNotifications() {
  const items = [
    { title: 'New Grade: Mathematics II', message: 'John Smith received 18/20 on the Midterm Exam.', type: 'grade', time: '2h ago', read: false },
    { title: 'Absence Recorded', message: 'John was absent in Biology on Apr 4.', type: 'attendance', time: '5d ago', read: false },
    { title: 'Payment Overdue', message: 'Library Fine of $25 for John Smith is past due.', type: 'payment', time: '1w ago', read: true },
    { title: 'Field Trip Permission', message: 'Biology field trip on Apr 18 requires your approval.', type: 'alert', time: '3d ago', read: true },
  ];

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Notifications</h1>
        <p className="mt-1 text-sm text-muted-foreground">Alerts and important updates.</p>
      </div>
      <div className="space-y-1.5">
        {items.map((n, i) => (
          <div key={i} className={cn('flex items-start gap-3 rounded-xl border px-4 py-3', n.read ? 'border-border bg-card' : 'border-primary/20 bg-primary/[0.02]')}>
            <Bell className={cn('h-4 w-4 mt-0.5 shrink-0', n.read ? 'text-muted-foreground' : 'text-primary')} />
            <div className="flex-1 min-w-0">
              <p className={cn('text-sm', n.read ? 'text-foreground' : 'font-medium text-foreground')}>{n.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{n.time}</p>
            </div>
            {!n.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />}
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
