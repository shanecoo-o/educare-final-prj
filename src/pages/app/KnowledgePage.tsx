import { useState } from 'react';
import { Search, BookOpen, FileText, Video, Link2, Filter } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/ui/section-header';
import { ContentCard } from '@/components/knowledge/ContentCard';
import { CategoryPill } from '@/components/knowledge/CategoryPill';

const categories = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Computer Science'];

const resources = [
  { title: 'Linear Algebra — Chapter 5 Notes', subject: 'Mathematics II', type: 'document' as const, date: 'Jun 14', author: 'Dr. Maria Smith' },
  { title: 'Newton\'s Laws Explained', subject: 'Physics', type: 'video' as const, date: 'Jun 12', author: 'Prof. Alex John' },
  { title: 'Organic Chemistry Practice Set', subject: 'Chemistry', type: 'exercise' as const, date: 'Jun 10', author: 'James Lee' },
  { title: 'Shakespeare: Hamlet Analysis', subject: 'English Literature', type: 'document' as const, date: 'Jun 8', author: 'Sarah Wilson' },
  { title: 'Cell Biology Interactive Lab', subject: 'Biology', type: 'link' as const, date: 'Jun 6', author: 'Dr. Rachel Green' },
  { title: 'Python Data Structures — Tutorial', subject: 'Computer Science', type: 'video' as const, date: 'Jun 5', author: 'Prof. David Chen' },
  { title: 'Calculus Problem Set #7', subject: 'Mathematics II', type: 'exercise' as const, date: 'Jun 3', author: 'Dr. Maria Smith' },
  { title: 'Thermodynamics Reference Guide', subject: 'Physics', type: 'document' as const, date: 'Jun 1', author: 'Prof. Alex John' },
  { title: 'Periodic Table — Interactive', subject: 'Chemistry', type: 'link' as const, date: 'May 28', author: 'James Lee' },
];

export default function KnowledgePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = resources.filter(r => {
    const matchCat = activeCategory === 'All' || r.subject.toLowerCase().includes(activeCategory.toLowerCase());
    const matchQuery = !query || r.title.toLowerCase().includes(query.toLowerCase()) || r.subject.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQuery;
  });

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

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-3 text-center">
          <FileText className="mx-auto h-4 w-4 text-info" />
          <p className="mt-1 font-heading text-lg font-bold text-foreground">24</p>
          <p className="text-[10px] text-muted-foreground">Documents</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-3 text-center">
          <Video className="mx-auto h-4 w-4 text-destructive" />
          <p className="mt-1 font-heading text-lg font-bold text-foreground">12</p>
          <p className="text-[10px] text-muted-foreground">Videos</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-3 text-center">
          <BookOpen className="mx-auto h-4 w-4 text-success" />
          <p className="mt-1 font-heading text-lg font-bold text-foreground">18</p>
          <p className="text-[10px] text-muted-foreground">Exercises</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-3 text-center">
          <Link2 className="mx-auto h-4 w-4 text-warning" />
          <p className="mt-1 font-heading text-lg font-bold text-foreground">8</p>
          <p className="text-[10px] text-muted-foreground">Links</p>
        </div>
      </div>

      {/* Content grid */}
      <SectionHeader title={activeCategory === 'All' ? 'All Resources' : activeCategory} subtitle={`${filtered.length} items`} />
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((r, i) => <ContentCard key={i} {...r} />)}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center">
          <Search className="mx-auto h-8 w-8 text-muted-foreground/40" />
          <p className="mt-3 text-sm font-medium text-foreground">No resources found</p>
          <p className="text-xs text-muted-foreground">Try adjusting your search or filter.</p>
        </div>
      )}
    </PageContainer>
  );
}
