import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/ui/section-header';
import { ScheduleView } from '@/components/academic/ScheduleView';
import { StatusBadge } from '@/components/ui/status-badge';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { AlertCard } from '@/components/dashboard/AlertCard';
import { QuickActionCard } from '@/components/dashboard/QuickActionCard';
import {
  students, subjects, grades, attendanceRecords, weeklySchedule, payments, obligations,
  notifications, feedItems, knowledgeItems,
  getStudentGrades, getStudentPayments, getSubjectAverage, getTodaySchedule
} from '@/data/mockData';
import {
  TrendingUp, CheckCircle, BookOpen, Wallet, Calendar, ClipboardList,
  Clock, FileText, MessageCircle, Bell, GraduationCap, Download,
  Video, Link as LinkIcon, HelpCircle, Presentation, Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';

const currentStudent = students[0];
const studentGrades = getStudentGrades('STU-001');
const studentPayments = getStudentPayments('STU-001');

/* ─── RE-EXPORT Dashboard ─── */
export { StudentDashboard } from '@/pages/app/RoleDashboards';

/* ─── GRADES ─── */
export function StudentGrades() {
  const subjectAverages = subjects.map(sub => ({
    ...sub,
    average: getSubjectAverage('STU-001', sub.id),
    grades: studentGrades.filter(g => g.subjectId === sub.id),
  }));

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">My Grades</h1>
        <p className="mt-1 text-sm text-muted-foreground">Academic performance across all subjects.</p>
      </div>

      {/* Overall stats */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="GPA" value={currentStudent.gpa.toFixed(1)} icon={TrendingUp} variant="primary" />
        <StatsCard label="Subjects" value={subjects.length} icon={BookOpen} />
        <StatsCard label="Evaluations" value={studentGrades.length} icon={ClipboardList} />
        <StatsCard label="Best Subject" value="Math II" icon={GraduationCap} />
      </div>

      {/* Subject cards */}
      <div className="space-y-3">
        {subjectAverages.map(sub => (
          <div key={sub.id} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-heading text-sm font-semibold text-foreground">{sub.name}</h3>
                <p className="text-xs text-muted-foreground">{sub.teacherName} · {sub.code}</p>
              </div>
              <div className="text-right">
                <span className="font-heading text-xl font-bold text-foreground">{sub.average}</span>
                <span className="text-sm text-muted-foreground">/20</span>
              </div>
            </div>
            {/* Progress bar */}
            <div className="h-1.5 w-full rounded-full bg-muted mb-3">
              <div
                className={cn('h-1.5 rounded-full transition-all', sub.average >= 14 ? 'bg-success' : sub.average >= 10 ? 'bg-warning' : 'bg-destructive')}
                style={{ width: `${(sub.average / 20) * 100}%` }}
              />
            </div>
            {/* Grade entries */}
            {sub.grades.length > 0 && (
              <div className="space-y-1">
                {sub.grades.map(g => (
                  <div key={g.id} className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2">
                      <StatusBadge label={g.type} variant={g.type === 'exam' ? 'primary' : g.type === 'lab' ? 'info' : 'muted'} />
                      <span className="text-sm text-foreground">{g.evaluation}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading text-sm font-bold text-foreground">{g.score}/{g.maxScore}</span>
                      <span className="text-[10px] text-muted-foreground">({g.weight}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

/* ─── ATTENDANCE ─── */
export function StudentAttendance() {
  const records = attendanceRecords.filter(a => a.studentId === 'STU-001');
  const presentCount = records.filter(r => r.status === 'present').length;
  const absentCount = records.filter(r => r.status === 'absent').length;
  const lateCount = records.filter(r => r.status === 'late').length;
  const excusedCount = records.filter(r => r.status === 'excused').length;

  const statusVariant = (s: string) => s === 'present' ? 'success' as const : s === 'absent' ? 'destructive' as const : s === 'late' ? 'warning' as const : 'info' as const;

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Attendance</h1>
        <p className="mt-1 text-sm text-muted-foreground">Track your attendance record.</p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Rate" value={`${currentStudent.attendanceRate}%`} icon={CheckCircle} variant="primary" />
        <StatsCard label="Present" value={presentCount} icon={CheckCircle} />
        <StatsCard label="Absent" value={absentCount} icon={Clock} />
        <StatsCard label="Late" value={lateCount} icon={Clock} />
      </div>

      {absentCount > 0 && (
        <AlertCard title={`${absentCount} absence(s) recorded`} description="Contact your advisor if any absences need to be excused." variant="warning" className="mb-4" />
      )}

      <SectionHeader title="Recent Records" className="mb-3" />
      <div className="space-y-1.5">
        {records.map(r => (
          <div key={r.id} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
            <div className="w-20 shrink-0">
              <p className="text-xs font-medium text-foreground">{new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground truncate">{r.subject}</p>
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
export function StudentSchedule() {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Schedule</h1>
        <p className="mt-1 text-sm text-muted-foreground">Your class schedule and calendar.</p>
      </div>
      <ScheduleView schedule={weeklySchedule} showTeacher />
    </PageContainer>
  );
}

/* ─── AGENDA ─── */
export function StudentAgenda() {
  const upcoming = [
    { title: 'Midterm Exam — Physics', date: 'Mon, Apr 22', type: 'exam' },
    { title: 'Lab Practical — Chemistry', date: 'Wed, Apr 25', type: 'lab' },
    { title: 'Essay #3 Due — English', date: 'Tue, Apr 15', type: 'project' },
    { title: 'Biology Field Trip', date: 'Fri, Apr 18', type: 'event' },
    { title: 'Lab Fee Payment Due', date: 'Jun 30', type: 'payment' },
  ];

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Agenda</h1>
        <p className="mt-1 text-sm text-muted-foreground">Personal agenda and reminders.</p>
      </div>

      <SectionHeader title="Upcoming" className="mb-3" />
      <div className="space-y-1.5">
        {upcoming.map((item, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm transition-all">
            <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.date}</p>
            </div>
            <StatusBadge label={item.type} variant={item.type === 'exam' ? 'destructive' : item.type === 'payment' ? 'warning' : 'muted'} />
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

/* ─── KNOWLEDGE ─── */
export function StudentKnowledge() {
  const [filter, setFilter] = useState<string>('all');
  const subjectNames = [...new Set(knowledgeItems.map(k => k.subject))];
  const filtered = filter === 'all' ? knowledgeItems : knowledgeItems.filter(k => k.subject === filter);

  const typeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'quiz': return <HelpCircle className="h-4 w-4" />;
      case 'presentation': return <Presentation className="h-4 w-4" />;
      case 'link': return <LinkIcon className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Knowledge Space</h1>
        <p className="mt-1 text-sm text-muted-foreground">Access learning materials and resources.</p>
      </div>

      {/* Filter */}
      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        <button onClick={() => setFilter('all')} className={cn('rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap', filter === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground')}>All</button>
        {subjectNames.map(s => (
          <button key={s} onClick={() => setFilter(s)} className={cn('rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap', filter === s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground')}>{s}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {filtered.map(item => (
          <div key={item.id} className="rounded-2xl border border-border bg-card p-4 hover:shadow-sm hover:border-primary/10 transition-all cursor-pointer active:scale-[0.99]">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {typeIcon(item.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                <div className="mt-2 flex items-center gap-2">
                  <StatusBadge label={item.subject} variant="primary" />
                  <span className="text-[10px] text-muted-foreground">{item.author}</span>
                  {item.size && <span className="text-[10px] text-muted-foreground">· {item.size}</span>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

/* ─── FEED ─── */
export function StudentFeed() {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Feed</h1>
        <p className="mt-1 text-sm text-muted-foreground">Latest updates from your institution.</p>
      </div>

      <div className="space-y-3">
        {feedItems.map(item => (
          <div key={item.id} className={cn('rounded-2xl border bg-card p-5 transition-all', item.pinned ? 'border-primary/20 bg-primary/[0.02]' : 'border-border')}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-bold text-foreground">{item.author[0]}</div>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.author}</p>
                  <p className="text-[10px] text-muted-foreground">{item.authorRole} · {new Date(item.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {item.pinned && <StatusBadge label="Pinned" variant="primary" />}
                <StatusBadge label={item.category} variant={item.category === 'announcement' ? 'info' : item.category === 'event' ? 'warning' : 'muted'} />
              </div>
            </div>
            <h3 className="font-heading text-sm font-semibold text-foreground mb-1">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.content}</p>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

/* ─── CHAT ─── */
export function StudentChat() {
  const conversations = [
    { name: 'Dr. Alan Smith', lastMessage: 'Great job on the midterm!', time: '2h ago', unread: 1 },
    { name: 'Prof. Elena Garcia', lastMessage: 'Don\'t forget lab report #5', time: '1d ago', unread: 0 },
    { name: 'Dr. David Park', lastMessage: 'Field trip details attached', time: '2d ago', unread: 0 },
    { name: 'Class 11B Group', lastMessage: 'Who has notes from Wednesday?', time: '3h ago', unread: 3 },
  ];

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Chat</h1>
        <p className="mt-1 text-sm text-muted-foreground">Messages with teachers and classmates.</p>
      </div>

      <div className="space-y-1.5">
        {conversations.map((c, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm hover:border-primary/10 transition-all cursor-pointer active:scale-[0.995]">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-heading text-sm font-bold text-primary">
              {c.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{c.name}</p>
              <p className="text-xs text-muted-foreground truncate">{c.lastMessage}</p>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span className="text-[10px] text-muted-foreground">{c.time}</span>
              {c.unread > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">{c.unread}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

/* ─── NOTIFICATIONS ─── */
export function StudentNotifications() {
  const typeIcon = (type: string) => {
    switch (type) {
      case 'grade': return <GraduationCap className="h-4 w-4 text-primary" />;
      case 'attendance': return <CheckCircle className="h-4 w-4 text-warning" />;
      case 'payment': return <Wallet className="h-4 w-4 text-destructive" />;
      case 'alert': return <Clock className="h-4 w-4 text-warning" />;
      case 'message': return <MessageCircle className="h-4 w-4 text-info" />;
      default: return <Bell className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Notifications</h1>
        <p className="mt-1 text-sm text-muted-foreground">Your alerts and notifications.</p>
      </div>

      <div className="space-y-1.5">
        {notifications.map(n => (
          <div key={n.id} className={cn('flex items-start gap-3 rounded-xl border px-4 py-3 transition-all', n.read ? 'border-border bg-card' : 'border-primary/20 bg-primary/[0.02]')}>
            <div className="mt-0.5 shrink-0">{typeIcon(n.type)}</div>
            <div className="flex-1 min-w-0">
              <p className={cn('text-sm', n.read ? 'text-foreground' : 'font-medium text-foreground')}>{n.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{new Date(n.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            {!n.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />}
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

/* ─── FINANCE ─── */
export function StudentFinance() {
  const pending = studentPayments.filter(p => ['pending', 'overdue', 'partial'].includes(p.status));
  const history = studentPayments.filter(p => ['paid', 'validated'].includes(p.status));
  const totalDue = pending.reduce((s, p) => s + (p.amount - p.paidAmount), 0);

  const statusVariant = (s: string) => s === 'paid' || s === 'validated' ? 'success' as const : s === 'overdue' ? 'destructive' as const : s === 'partial' ? 'warning' as const : 'muted' as const;

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">My Finances</h1>
        <p className="mt-1 text-sm text-muted-foreground">View your fees, payments and receipts.</p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatsCard label="Total Due" value={`$${totalDue.toLocaleString()}`} icon={Wallet} variant="primary" />
        <StatsCard label="Overdue" value={`$${pending.filter(p => p.status === 'overdue').reduce((s, p) => s + p.amount, 0)}`} icon={Clock} />
        <StatsCard label="Paid This Year" value={`$${history.reduce((s, p) => s + p.paidAmount, 0).toLocaleString()}`} icon={CheckCircle} />
      </div>

      {pending.some(p => p.status === 'overdue') && (
        <AlertCard title="You have overdue payments" description="Please settle overdue items to avoid penalties." variant="destructive" className="mb-4" />
      )}

      <SectionHeader title="Pending" className="mb-3" />
      <div className="space-y-1.5 mb-6">
        {pending.map(p => (
          <div key={p.id} className={cn('flex items-center gap-3 rounded-xl border bg-card px-4 py-3', p.status === 'overdue' ? 'border-destructive/20' : 'border-border')}>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{p.concept}</p>
              <p className="text-xs text-muted-foreground">Due {new Date(p.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
            </div>
            <span className={cn('font-heading text-sm font-bold', p.status === 'overdue' ? 'text-destructive' : 'text-foreground')}>${p.amount.toLocaleString()}</span>
            <StatusBadge label={p.status} variant={statusVariant(p.status)} />
          </div>
        ))}
      </div>

      <SectionHeader title="Payment History" className="mb-3" />
      <div className="space-y-1.5">
        {history.map(p => (
          <div key={p.id} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{p.concept}</p>
              <p className="text-xs text-muted-foreground">Paid {p.paidDate && new Date(p.paidDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {p.method}</p>
            </div>
            <span className="font-heading text-sm font-bold text-foreground">${p.paidAmount.toLocaleString()}</span>
            <StatusBadge label={p.status} variant="success" />
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
