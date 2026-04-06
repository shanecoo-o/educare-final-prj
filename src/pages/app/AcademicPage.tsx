import { PageContainer } from '@/components/layout/PageContainer';
import { EmptyState } from '@/components/states/EmptyState';
import { GraduationCap } from 'lucide-react';

export default function AcademicPage() {
  return (
    <PageContainer>
      <EmptyState
        icon={GraduationCap}
        title="Academic Module"
        description="Course management, grades, attendance, and curriculum will live here."
      />
    </PageContainer>
  );
}
