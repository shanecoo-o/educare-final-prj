import { Users, BookOpen, UserCheck } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/ui/section-header';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { EventCard } from '@/components/dashboard/EventCard';
import campusHero from '@/assets/campus-hero.jpg';

const stats = [
  { label: 'Students', value: '2,635', icon: Users, variant: 'primary' as const, trend: '+12% this term', trendUp: true },
  { label: 'Teachers', value: '29', icon: UserCheck, variant: 'accent' as const },
  { label: 'Faculty', value: '60', icon: BookOpen, variant: 'default' as const },
];

const events = [
  { date: 'Monday 22nd Jun, 2025', title: 'Model test of 11th class' },
  { date: 'Friday 15th Aug, 2025', title: 'Final project presentation' },
  { date: 'Tuesday 15th Aug, 2025', title: 'Final exam for Introduction to Psychology' },
  { date: 'Friday 3rd Sep, 2025', title: 'Practical assessment in Chemistry' },
  { date: 'Wednesday 12th Oct, 2025', title: 'Group project presentation for History 101' },
];

const teachers = [
  { name: 'Alex John', role: 'Physics Teacher' },
  { name: 'Maria Smith', role: 'Mathematics Tutor' },
  { name: 'James Lee', role: 'Chemistry Instructor' },
];

export default function DashboardPage() {
  return (
    <PageContainer>
      {/* Hero banner */}
      <div className="relative mb-6 overflow-hidden rounded-2xl">
        <img
          src={campusHero}
          alt="Campus"
          className="h-40 w-full object-cover md:h-48"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 to-transparent" />
        <div className="absolute bottom-4 left-5 md:bottom-6 md:left-8">
          <h1 className="font-heading text-xl font-bold text-primary-foreground md:text-2xl">
            Welcome back
          </h1>
          <p className="mt-0.5 text-sm text-primary-foreground/80">
            EDUCORE Dashboard — Everything at a glance
          </p>
        </div>
        <div className="absolute right-5 top-4 md:right-8 md:top-6">
          <div className="rounded-xl bg-card/90 glass px-4 py-2.5 shadow-md">
            <p className="text-xs font-medium text-muted-foreground">Add New Members</p>
            <div className="mt-1.5 flex gap-2">
              <button className="rounded-lg bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                + Add Student
              </button>
              <button className="rounded-lg bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors">
                + Add Teacher
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <StatsCard key={s.label} {...s} />
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Growth + Teachers column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Growth card */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <SectionHeader title="Growth" subtitle="Academy growth over time" action={
              <span className="rounded-lg bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">Monthly</span>
            } />
            <div className="mt-6 flex items-center justify-center">
              <div className="relative h-40 w-40">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
                  <circle
                    cx="60" cy="60" r="50" fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${62 * 3.14} ${100 * 3.14}`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-heading text-2xl font-bold text-foreground">62%</span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">Academy growth</p>
          </div>

          {/* Top Teachers */}
          <div className="rounded-2xl bg-surface-dark p-5">
            <SectionHeader
              title="Top Teachers"
              className="[&_h2]:text-surface-dark-foreground [&_p]:text-surface-dark-foreground/60"
              action={
                <div className="flex gap-1.5">
                  <button className="rounded-lg bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">All Time</button>
                  <button className="rounded-lg bg-surface-dark px-3 py-1 text-xs font-medium text-surface-dark-foreground/60 border border-surface-dark-foreground/10">This year</button>
                </div>
              }
            />
            <div className="mt-4 space-y-3">
              {teachers.map((t) => (
                <div key={t.name} className="flex items-center justify-between rounded-xl px-1 py-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-dark-foreground/10 text-sm font-semibold text-surface-dark-foreground">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-surface-dark-foreground">{t.name}</p>
                      <p className="text-xs text-surface-dark-foreground/50">{t.role}</p>
                    </div>
                  </div>
                  <button className="flex h-7 w-7 items-center justify-center rounded-lg text-surface-dark-foreground/40 hover:bg-surface-dark-foreground/10 transition-colors">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" /></svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Events column */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-5">
            <SectionHeader
              title="Upcoming Events/Exams"
              subtitle="Scheduled events and tests"
              action={
                <button className="rounded-lg border border-border px-3 py-1 text-xs font-medium text-foreground hover:bg-muted transition-colors">
                  View All
                </button>
              }
            />
            <div className="mt-4 space-y-2.5">
              {events.map((e, i) => (
                <EventCard key={i} date={e.date} title={e.title} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Countdown card */}
      <div className="mt-6 rounded-2xl border border-border bg-card p-5">
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <h3 className="font-heading text-xl font-bold text-foreground">12 Days left</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              We are pleased to announce that we will be celebrating our 16th anniversary.
            </p>
          </div>
          <div className="flex flex-wrap gap-1">
            {Array.from({ length: 28 }).map((_, i) => (
              <div
                key={i}
                className={`h-3 w-3 rounded-full ${i < 16 ? 'bg-primary' : 'bg-primary/20'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
