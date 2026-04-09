import { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/ui/section-header';
import { ScheduleView } from '@/components/academic/ScheduleView';
import { StatusBadge } from '@/components/ui/status-badge';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { AlertCard } from '@/components/dashboard/AlertCard';
import {
  teachers, classGroups, students, teacherSchedule, assessments, knowledgeItems, grades, attendanceRecords,
  getTodaySchedule
} from '@/data/mockData';
import {
  Calendar, Users, ClipboardList, BookOpen, CheckCircle, FileText,
  MessageCircle, Bell, GraduationCap, Clock, Plus, Save
} from 'lucide-react';
import { cn } from '@/lib/utils';

const currentTeacher = teachers[0]; // Dr. Alan Smith

export { TeacherDashboard } from '@/pages/app/RoleDashboards';

/* ─── SCHEDULE ─── */
export function TeacherSchedule() {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">My Schedule</h1>
        <p className="mt-1 text-sm text-muted-foreground">Your teaching schedule.</p>
      </div>
      <ScheduleView schedule={teacherSchedule} showTeacher={false} showClassGroup />
    </PageContainer>
  );
}

/* ─── CLASSES ─── */
export function TeacherClasses() {
  const myClasses = classGroups.filter(c => ['Grade 10A', 'Grade 10B', 'Grade 11A', 'Grade 11B', 'Grade 12A', 'Grade 12B'].includes(c.name));

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">My Classes</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your classes and students.</p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Classes" value={currentTeacher.classCount} icon={Users} variant="primary" />
        <StatsCard label="Students" value={currentTeacher.studentCount} icon={GraduationCap} />
        <StatsCard label="Subjects" value={currentTeacher.subjects.length} icon={BookOpen} />
        <StatsCard label="At Risk" value={2} icon={Clock} trend="Needs attention" />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {myClasses.slice(0, 4).map(cls => (
          <div key={cls.id} className="rounded-2xl border border-border bg-card p-5 hover:shadow-sm hover:border-primary/10 transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-heading text-sm font-semibold text-foreground">{cls.name}</h3>
              <StatusBadge label={`${cls.studentCount} students`} variant="muted" />
            </div>
            <p className="text-xs text-muted-foreground mb-3">Advisor: {cls.advisor}</p>
            <div className="flex gap-2">
              {currentTeacher.subjects.slice(0, 2).map((sub, i) => (
                <StatusBadge key={i} label={sub} variant="primary" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

/* ─── ATTENDANCE ─── */
export function TeacherAttendance() {
  const classStudents = students.slice(0, 6);
  const [attendanceState, setAttendanceState] = useState<Record<string, string>>(
    Object.fromEntries(classStudents.map(s => [s.id, 'present']))
  );

  return (
    <PageContainer>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Attendance</h1>
          <p className="mt-1 text-sm text-muted-foreground">Mathematics II — Grade 11B · {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors active:scale-95">
          <Save className="h-4 w-4" />
          Save
        </button>
      </div>

      <div className="space-y-1.5">
        {classStudents.map(s => (
          <div key={s.id} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted font-heading text-xs font-bold text-foreground">{s.avatar}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{s.name}</p>
              <p className="text-xs text-muted-foreground">{s.id} · Rate: {s.attendanceRate}%</p>
            </div>
            <div className="flex gap-1">
              {(['present', 'absent', 'late'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => setAttendanceState(prev => ({ ...prev, [s.id]: status }))}
                  className={cn(
                    'rounded-lg px-2.5 py-1 text-xs font-medium transition-all active:scale-95',
                    attendanceState[s.id] === status
                      ? status === 'present' ? 'bg-success text-success-foreground' : status === 'absent' ? 'bg-destructive text-destructive-foreground' : 'bg-warning text-warning-foreground'
                      : 'bg-muted text-muted-foreground hover:text-foreground'
                  )}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

/* ─── GRADEBOOK ─── */
export function TeacherGradebook() {
  const classStudents = students.slice(0, 6);

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Gradebook</h1>
        <p className="mt-1 text-sm text-muted-foreground">Mathematics II — Grade 11B</p>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Student</th>
                <th className="text-center px-3 py-3 font-medium text-muted-foreground">Midterm</th>
                <th className="text-center px-3 py-3 font-medium text-muted-foreground">Lab</th>
                <th className="text-center px-3 py-3 font-medium text-muted-foreground">HW</th>
                <th className="text-center px-3 py-3 font-medium text-muted-foreground">Avg</th>
              </tr>
            </thead>
            <tbody>
              {classStudents.map(s => {
                const sg = grades.filter(g => g.studentId === s.id && g.subjectName === 'Mathematics II');
                const midterm = sg.find(g => g.type === 'exam');
                const lab = sg.find(g => g.type === 'lab');
                const hw = sg.find(g => g.type === 'homework');
                const avg = sg.length ? Math.round(sg.reduce((sum, g) => sum + g.score, 0) / sg.length * 10) / 10 : '-';
                return (
                  <tr key={s.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-[10px] font-bold">{s.avatar}</div>
                        <span className="font-medium text-foreground">{s.name}</span>
                      </div>
                    </td>
                    <td className="text-center px-3 py-3 font-heading font-bold">{midterm ? `${midterm.score}/${midterm.maxScore}` : '—'}</td>
                    <td className="text-center px-3 py-3 font-heading font-bold">{lab ? `${lab.score}/${lab.maxScore}` : '—'}</td>
                    <td className="text-center px-3 py-3 font-heading font-bold">{hw ? `${hw.score}/${hw.maxScore}` : '—'}</td>
                    <td className="text-center px-3 py-3">
                      <span className={cn('font-heading font-bold', typeof avg === 'number' && avg >= 14 ? 'text-success' : typeof avg === 'number' && avg >= 10 ? 'text-warning' : typeof avg === 'number' ? 'text-destructive' : '')}>
                        {avg}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </PageContainer>
  );
}

/* ─── ASSESSMENTS ─── */
export function TeacherAssessments() {
  const statusVariant = (s: string) => s === 'graded' ? 'success' as const : s === 'upcoming' ? 'warning' as const : s === 'published' ? 'info' as const : 'muted' as const;

  return (
    <PageContainer>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Assessments</h1>
          <p className="mt-1 text-sm text-muted-foreground">Create and manage evaluations.</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors active:scale-95">
          <Plus className="h-4 w-4" />
          New
        </button>
      </div>

      <div className="space-y-2">
        {assessments.map(a => (
          <div key={a.id} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm transition-all">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{a.title} — {a.subject}</p>
              <p className="text-xs text-muted-foreground">{a.classGroup} · {new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · Weight: {a.weight}%</p>
            </div>
            <div className="text-right shrink-0">
              {a.status === 'graded' || a.status === 'published' ? (
                <p className="text-xs text-muted-foreground">{a.gradedCount}/{a.totalStudents} graded</p>
              ) : null}
            </div>
            <StatusBadge label={a.status} variant={statusVariant(a.status)} />
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

/* ─── KNOWLEDGE ─── */
export function TeacherKnowledge() {
  const myMaterials = knowledgeItems.filter(k => k.author === currentTeacher.name);

  return (
    <PageContainer>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Knowledge Space</h1>
          <p className="mt-1 text-sm text-muted-foreground">Publish learning materials.</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors active:scale-95">
          <Plus className="h-4 w-4" />
          Upload
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {myMaterials.map(item => (
          <div key={item.id} className="rounded-2xl border border-border bg-card p-4 hover:shadow-sm transition-all">
            <h3 className="text-sm font-medium text-foreground">{item.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{item.description}</p>
            <div className="mt-3 flex items-center gap-2">
              <StatusBadge label={item.type} variant="primary" />
              <StatusBadge label={item.subject} variant="muted" />
              {item.size && <span className="text-[10px] text-muted-foreground">{item.size}</span>}
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

/* ─── CHAT ─── */
export function TeacherChat() {
  const conversations = [
    { name: 'Grade 11B Group', lastMessage: 'Midterm schedule confirmed', time: '1h ago', unread: 5 },
    { name: 'John Smith', lastMessage: 'Thank you for the feedback!', time: '3h ago', unread: 0 },
    { name: 'Prof. Elena Garcia', lastMessage: 'Can we coordinate lab times?', time: '1d ago', unread: 1 },
    { name: 'Academic Coordination', lastMessage: 'Grade submission deadline reminder', time: '2d ago', unread: 0 },
  ];

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Chat</h1>
        <p className="mt-1 text-sm text-muted-foreground">Messages with students and staff.</p>
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
export function TeacherNotifications() {
  const items = [
    { title: '12 grades pending review', message: 'Midterm grades for Mathematics II need to be published by Friday.', type: 'alert', time: '1h ago', read: false },
    { title: 'Lab Report #5 submissions', message: '18 out of 31 students have submitted.', type: 'grade', time: '3h ago', read: false },
    { title: 'Staff meeting reminder', message: 'Thursday at 4 PM in Room 101.', type: 'announcement', time: '1d ago', read: true },
    { title: 'Schedule change', message: 'Grade 12A Statistics moved to Room 108 next week.', type: 'announcement', time: '2d ago', read: true },
  ];

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Notifications</h1>
        <p className="mt-1 text-sm text-muted-foreground">Your alerts and notifications.</p>
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
