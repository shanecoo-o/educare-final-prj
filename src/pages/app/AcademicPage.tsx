import { useState } from 'react';
import { Search, BookOpen, TrendingUp, Calendar, CheckCircle } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/ui/section-header';
import { SubjectCard } from '@/components/academic/SubjectCard';
import { GradeCard } from '@/components/academic/GradeCard';
import { ScheduleCard } from '@/components/academic/ScheduleCard';
import { CategoryPill } from '@/components/knowledge/CategoryPill';

const tabs = ['Overview', 'Subjects', 'Grades', 'Attendance', 'Schedule', 'Evaluations'];

const subjects = [
  { name: 'Mathematics II', teacher: 'Dr. Maria Smith', grade: 'A', gradeColor: 'success' as const, progress: 78, nextClass: 'Tomorrow 9:00 AM' },
  { name: 'Physics', teacher: 'Prof. Alex John', grade: 'B+', gradeColor: 'primary' as const, progress: 65, nextClass: 'Today 2:00 PM' },
  { name: 'Chemistry', teacher: 'James Lee', grade: 'A-', gradeColor: 'success' as const, progress: 82 },
  { name: 'English Literature', teacher: 'Sarah Wilson', grade: 'B', gradeColor: 'primary' as const, progress: 60, nextClass: 'Wed 10:00 AM' },
  { name: 'Biology', teacher: 'Dr. Rachel Green', grade: 'C+', gradeColor: 'warning' as const, progress: 45 },
  { name: 'Computer Science', teacher: 'Prof. David Chen', grade: 'A+', gradeColor: 'success' as const, progress: 92 },
];

const recentGrades = [
  { subject: 'Mathematics II', evaluation: 'Midterm Exam', grade: '18', maxGrade: '20', date: 'Jun 15', status: 'published' as const },
  { subject: 'Physics', evaluation: 'Lab Report #4', grade: '15', maxGrade: '20', date: 'Jun 12', status: 'published' as const },
  { subject: 'Biology', evaluation: 'Quiz 3', grade: '12', maxGrade: '20', date: 'Jun 10', status: 'pending' as const },
  { subject: 'Chemistry', evaluation: 'Practical Exam', grade: '17', maxGrade: '20', date: 'Jun 8', status: 'reviewed' as const },
];

const scheduleItems = [
  { time: '08:00', subject: 'Mathematics II', room: 'Room 201', teacher: 'Dr. Smith', current: false },
  { time: '09:30', subject: 'Physics Lab', room: 'Lab 3', teacher: 'Prof. John', current: true },
  { time: '11:00', subject: 'English Literature', room: 'Room 105', teacher: 'S. Wilson', current: false },
  { time: '14:00', subject: 'Computer Science', room: 'Lab 1', teacher: 'Prof. Chen', current: false },
  { time: '15:30', subject: 'Biology', room: 'Room 302', teacher: 'Dr. Green', current: false },
];

const attendanceData = { present: 87, absent: 8, late: 5, total: 120 };

export default function AcademicPage() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Academic</h1>
        <p className="mt-1 text-sm text-muted-foreground">Your academic overview, subjects, grades, and schedule.</p>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {tabs.map((tab) => (
          <CategoryPill key={tab} label={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)} />
        ))}
      </div>

      {activeTab === 'Overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border border-border bg-card p-4 text-center">
              <BookOpen className="mx-auto h-5 w-5 text-primary" />
              <p className="mt-2 font-heading text-xl font-bold text-foreground">6</p>
              <p className="text-xs text-muted-foreground">Subjects</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 text-center">
              <TrendingUp className="mx-auto h-5 w-5 text-success" />
              <p className="mt-2 font-heading text-xl font-bold text-foreground">3.6</p>
              <p className="text-xs text-muted-foreground">GPA</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 text-center">
              <CheckCircle className="mx-auto h-5 w-5 text-info" />
              <p className="mt-2 font-heading text-xl font-bold text-foreground">{attendanceData.present}%</p>
              <p className="text-xs text-muted-foreground">Attendance</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 text-center">
              <Calendar className="mx-auto h-5 w-5 text-warning" />
              <p className="mt-2 font-heading text-xl font-bold text-foreground">3</p>
              <p className="text-xs text-muted-foreground">Upcoming Exams</p>
            </div>
          </div>

          <div>
            <SectionHeader title="My Subjects" action={<button className="text-xs font-medium text-primary hover:underline">View All</button>} />
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {subjects.slice(0, 3).map((s) => <SubjectCard key={s.name} {...s} />)}
            </div>
          </div>

          <div>
            <SectionHeader title="Recent Grades" action={<button className="text-xs font-medium text-primary hover:underline">All Grades</button>} />
            <div className="mt-3 space-y-2">
              {recentGrades.slice(0, 3).map((g, i) => <GradeCard key={i} {...g} />)}
            </div>
          </div>

          <ScheduleCard day="Today — Monday" items={scheduleItems.slice(0, 4)} />

          <div className="rounded-2xl border border-border bg-card p-5">
            <SectionHeader title="Attendance Overview" />
            <div className="mt-4 flex items-center gap-6">
              <div className="relative h-28 w-28">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                  <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(var(--success))" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${attendanceData.present * 3.14} ${100 * 3.14}`} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-heading text-lg font-bold text-foreground">{attendanceData.present}%</span>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2"><div className="h-2.5 w-2.5 rounded-full bg-success" /><span className="text-muted-foreground">Present — {attendanceData.present}%</span></div>
                <div className="flex items-center gap-2"><div className="h-2.5 w-2.5 rounded-full bg-destructive" /><span className="text-muted-foreground">Absent — {attendanceData.absent}%</span></div>
                <div className="flex items-center gap-2"><div className="h-2.5 w-2.5 rounded-full bg-warning" /><span className="text-muted-foreground">Late — {attendanceData.late}%</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Subjects' && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((s) => <SubjectCard key={s.name} {...s} />)}
        </div>
      )}

      {activeTab === 'Grades' && (
        <div className="space-y-2">
          {recentGrades.map((g, i) => <GradeCard key={i} {...g} />)}
        </div>
      )}

      {activeTab === 'Attendance' && (
        <div className="rounded-2xl border border-border bg-card p-5">
          <SectionHeader title="Attendance Overview" />
          <div className="mt-6 flex flex-col items-center gap-6">
            <div className="relative h-40 w-40">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
                <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(var(--success))" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${attendanceData.present * 3.14} ${100 * 3.14}`} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-heading text-2xl font-bold text-foreground">{attendanceData.present}%</span>
                <span className="text-xs text-muted-foreground">Present</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div><p className="font-heading text-lg font-bold text-success">{attendanceData.present}%</p><p className="text-xs text-muted-foreground">Present</p></div>
              <div><p className="font-heading text-lg font-bold text-destructive">{attendanceData.absent}%</p><p className="text-xs text-muted-foreground">Absent</p></div>
              <div><p className="font-heading text-lg font-bold text-warning">{attendanceData.late}%</p><p className="text-xs text-muted-foreground">Late</p></div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Schedule' && <ScheduleCard day="Today — Monday" items={scheduleItems} />}

      {activeTab === 'Evaluations' && (
        <div className="space-y-3">
          <div className="rounded-2xl border border-warning/30 bg-warning/5 p-4">
            <p className="text-sm font-medium text-foreground">Upcoming: Midterm — Physics</p>
            <p className="text-xs text-muted-foreground">Monday 22nd Jun, 2025 · Room 201</p>
          </div>
          <div className="rounded-2xl border border-warning/30 bg-warning/5 p-4">
            <p className="text-sm font-medium text-foreground">Upcoming: Final Project — Computer Science</p>
            <p className="text-xs text-muted-foreground">Friday 15th Aug, 2025 · Submission online</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="text-sm font-medium text-foreground">Completed: Midterm — Mathematics II</p>
            <p className="text-xs text-muted-foreground">Jun 15, 2025 · Grade: 18/20</p>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
