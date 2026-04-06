import { useState } from 'react';
import { Search, BookOpen, FileText, Video, Link2, Filter, FolderOpen } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/ui/section-header';
import { ContentCard } from '@/components/knowledge/ContentCard';
import { CategoryPill } from '@/components/knowledge/CategoryPill';
import { EmptyState } from '@/components/states/EmptyState';

const categories = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Computer Science'];

const modules = [
  { subject: 'Mathematics II', topics: 5, resources: 12, progress: 78 },
  { subject: 'Physics', topics: 6, resources: 15, progress: 65 },
  { subject: 'Chemistry', topics: 4, resources: 9, progress: 82 },
  { subject: 'Computer Science', topics: 7, resources: 18, progress: 92 },
];

const resources = [
  { title: 'Linear Algebra — Chapter 5 Notes', subject: 'Mathematics II', type: 'document' as const, date: 'Jun 14', author: 'Dr. Maria Smith', module: 'Linear Algebra' },
  { title: 'Newton\'s Laws Explained', subject: 'Physics', type: 'video' as const, date: 'Jun 12', author: 'Prof. Alex John', module: 'Mechanics' },
  { title: 'Organic Chemistry Practice Set', subject: 'Chemistry', type: 'exercise' as const, date: 'Jun 10', author: 'James Lee', module: 'Organic Chemistry' },
  { title: 'Shakespeare: Hamlet Analysis', subject: 'English Literature', type: 'document' as const, date: 'Jun 8', author: 'Sarah Wilson', module: 'Drama' },
  { title: 'Cell Biology Interactive Lab', subject: 'Biology', type: 'link' as const, date: 'Jun 6', author: 'Dr. Rachel Green', module: 'Cell Biology' },
  { title: 'Python Data Structures — Tutorial', subject: 'Computer Science', type: 'video' as const, date: 'Jun 5', author: 'Prof. David Chen', module: 'Data Structures' },
  { title: 'Calculus Problem Set #7', subject: 'Mathematics II', type: 'exercise' as const, date: 'Jun 3', author: 'Dr. Maria Smith', module: 'Calculus' },
  { title: 'Thermodynamics Reference Guide', subject: 'Physics', type: 'document' as const, date: 'Jun 1', author: 'Prof. Alex John', module: 'Thermodynamics' },
  { title: 'Periodic Table — Interactive', subject: 'Chemistry', type: 'link' as const, date: 'May 28', author: 'James Lee', module: 'Inorganic Chemistry' },
];

export default function KnowledgePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [view, setView] = useState<'resources' | 'modules'>('resources');

  const filtered = resources.filter(r => {
    const matchCat = activeCategory === 'All' || r.subject.toLowerCase().includes(activeCategory.toLowerCase());
    const matchQuery = !query || r.title.toLowerCase().includes(query.toLowerCase()) || r.subject.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQuery;
  });

  const typeStats = {
    documents: resources.filter(r => r.type === 'document').length,
    videos: resources.filter(r => r.type === 'video').length,
    exercises: resources.filter(r => r.type === 'exercise').length,
    links: resources.filter(r => r.type === 'link').length,
  };

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Knowledge Space</h1>
        <p className="mt-1 text-sm text-muted-foreground">Resources, learning materials, and digital content for your courses.</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search resources, topics, subjects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {categories.map(c => (
          <CategoryPill key={c} label={c} active={activeCategory === c} onClick={() => setActiveCategory(c)} />
        ))}
      </div>

      {/* View toggle */}
      <div className="mb-6 flex items-center gap-2">
        <button
          onClick={() => setView('resources')}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${view === 'resources' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
        >
          Resources
        </button>
        <button
          onClick={() => setView('modules')}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${view === 'modules' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
        >
          Modules
        </button>
      </div>

      {view === 'resources' && (
        <>
          {/* Stats */}
          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-border bg-card p-3 text-center">
              <FileText className="mx-auto h-4 w-4 text-info" />
              <p className="mt-1 font-heading text-lg font-bold text-foreground">{typeStats.documents}</p>
              <p className="text-[10px] text-muted-foreground">Documents</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-3 text-center">
              <Video className="mx-auto h-4 w-4 text-destructive" />
              <p className="mt-1 font-heading text-lg font-bold text-foreground">{typeStats.videos}</p>
              <p className="text-[10px] text-muted-foreground">Videos</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-3 text-center">
              <BookOpen className="mx-auto h-4 w-4 text-success" />
              <p className="mt-1 font-heading text-lg font-bold text-foreground">{typeStats.exercises}</p>
              <p className="text-[10px] text-muted-foreground">Exercises</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-3 text-center">
              <Link2 className="mx-auto h-4 w-4 text-warning" />
              <p className="mt-1 font-heading text-lg font-bold text-foreground">{typeStats.links}</p>
              <p className="text-[10px] text-muted-foreground">Links</p>
            </div>
          </div>

          {/* Content grid */}
          <SectionHeader title={activeCategory === 'All' ? 'All Resources' : activeCategory} subtitle={`${filtered.length} items`} />
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r, i) => <ContentCard key={i} {...r} />)}
          </div>

          {filtered.length === 0 && (
            <EmptyState icon={Search} title="No resources found" description="Try adjusting your search or filter." />
          )}
        </>
      )}

      {view === 'modules' && (
        <div className="space-y-3">
          {modules.map(m => (
            <div key={m.subject} className="rounded-2xl border border-border bg-card p-5 transition-all hover:shadow-md hover:border-primary/20 cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <FolderOpen className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-sm font-semibold text-foreground">{m.subject}</h3>
                  <p className="text-xs text-muted-foreground">{m.topics} topics · {m.resources} resources</p>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium text-foreground">{m.progress}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${m.progress}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
