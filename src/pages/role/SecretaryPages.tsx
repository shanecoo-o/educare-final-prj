import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/ui/section-header';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { StatusBadge } from '@/components/ui/status-badge';
import { AlertCard } from '@/components/dashboard/AlertCard';
import { students, classGroups } from '@/data/mockData';
import { Users, UserCheck, ClipboardList, FolderOpen, Calendar, BookOpen, FileText, Download } from 'lucide-react';

export function SecretaryDashboard() {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Painel da Secretaria</h1>
        <p className="mt-1 text-sm text-muted-foreground">Admissões, matrículas e gestão de alunos.</p>
      </div>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Alunos" value="176" icon={Users} variant="primary" />
        <StatsCard label="Admissões Pendentes" value="14" icon={UserCheck} />
        <StatsCard label="Matrículas Activas" value="176" icon={ClipboardList} />
        <StatsCard label="Documentos" value="342" icon={FolderOpen} />
      </div>
      <AlertCard title="14 admissões pendentes de análise" description="Novos processos de admissão requerem avaliação." variant="info" action="Analisar" className="mb-6" />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <SectionHeader title="Admissões Recentes" />
          <div className="mt-3 space-y-2">
            {[
              { name: 'Ana Manhiça', classe: '10ª', data: '10 Abr 2026', status: 'pendente' },
              { name: 'Bruno Nhanala', classe: '11ª', data: '9 Abr 2026', status: 'aprovado' },
              { name: 'Célia Dzimba', classe: '10ª', data: '8 Abr 2026', status: 'pendente' },
            ].map((a, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-border px-4 py-3">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{a.name}</p>
                  <p className="text-xs text-muted-foreground">{a.classe} Classe · {a.data}</p>
                </div>
                <StatusBadge label={a.status === 'aprovado' ? 'Aprovado' : 'Pendente'} variant={a.status === 'aprovado' ? 'success' : 'warning'} />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <SectionHeader title="Turmas" />
          <div className="mt-3 space-y-2">
            {classGroups.slice(0, 4).map(c => (
              <div key={c.id} className="flex items-center justify-between rounded-xl border border-border px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.directorTurma}</p>
                </div>
                <StatusBadge label={`${c.studentCount} alunos`} variant="muted" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export function SecretaryAdmissions() {
  const admissions = [
    { name: 'Ana Manhiça', classe: '10ª', data: '10 Abr 2026', status: 'pendente' },
    { name: 'Bruno Nhanala', classe: '11ª', data: '9 Abr 2026', status: 'aprovado' },
    { name: 'Célia Dzimba', classe: '10ª', data: '8 Abr 2026', status: 'pendente' },
    { name: 'David Cumbane', classe: '10ª', data: '7 Abr 2026', status: 'rejeitado' },
    { name: 'Elisa Mabjaia', classe: '12ª', data: '5 Abr 2026', status: 'aprovado' },
  ];

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Admissões</h1>
        <p className="mt-1 text-sm text-muted-foreground">Processar novas admissões de alunos.</p>
      </div>
      <div className="space-y-1.5">
        {admissions.map((a, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{a.name}</p>
              <p className="text-xs text-muted-foreground">{a.classe} Classe · Submetido {a.data}</p>
            </div>
            <StatusBadge label={a.status === 'aprovado' ? 'Aprovado' : a.status === 'rejeitado' ? 'Rejeitado' : 'Pendente'} variant={a.status === 'aprovado' ? 'success' : a.status === 'rejeitado' ? 'destructive' : 'warning'} />
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

export function SecretaryEnrollments() {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Matrículas</h1>
        <p className="mt-1 text-sm text-muted-foreground">Gestão de matrículas activas.</p>
      </div>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatsCard label="Activas" value="176" icon={ClipboardList} variant="primary" />
        <StatsCard label="Novas (mês)" value="3" icon={UserCheck} />
        <StatsCard label="Canceladas" value="1" icon={Users} />
      </div>
      <div className="space-y-1.5">
        {students.map(s => (
          <div key={s.id} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-bold">{s.avatar}</div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{s.name}</p>
              <p className="text-xs text-muted-foreground">{s.classe}ª {s.turma} · {s.id}</p>
            </div>
            <StatusBadge label="Activa" variant="success" />
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

export function SecretaryStudents() {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Alunos</h1>
        <p className="mt-1 text-sm text-muted-foreground">Directório e registos de alunos.</p>
      </div>
      <div className="space-y-1.5">
        {students.map(s => (
          <div key={s.id} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm cursor-pointer transition-all">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{s.avatar}</div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{s.name}</p>
              <p className="text-xs text-muted-foreground">{s.classe}ª {s.turma} · {s.id} · {s.email}</p>
            </div>
            <StatusBadge label={s.estado === 'excelente' ? 'Excelente' : s.estado === 'em_risco' ? 'Em Risco' : 'Activo'} variant={s.estado === 'excelente' ? 'success' : s.estado === 'em_risco' ? 'warning' : 'muted'} />
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

export function SecretaryDocuments() {
  const docs = [
    { name: 'Certificado de Matrícula', count: 176, type: 'certificado' },
    { name: 'Pauta de Notas', count: 12, type: 'pauta' },
    { name: 'Declaração de Frequência', count: 45, type: 'declaracao' },
    { name: 'Ficha de Transferência', count: 3, type: 'transferencia' },
  ];

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Documentos</h1>
        <p className="mt-1 text-sm text-muted-foreground">Geração e gestão de documentos.</p>
      </div>
      <div className="space-y-2">
        {docs.map((d, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm transition-all cursor-pointer">
            <FolderOpen className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{d.name}</p>
              <p className="text-xs text-muted-foreground">{d.count} documentos emitidos</p>
            </div>
            <button className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted/80 transition-colors">
              <Download className="h-3 w-3 inline mr-1" />Gerar
            </button>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

export function SecretaryClasses() {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Turmas</h1>
        <p className="mt-1 text-sm text-muted-foreground">Configuração e gestão de turmas.</p>
      </div>
      <div className="space-y-2">
        {classGroups.map(c => (
          <div key={c.id} className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm cursor-pointer transition-all">
            <div>
              <p className="text-sm font-medium text-foreground">{c.name}</p>
              <p className="text-xs text-muted-foreground">Dir. Turma: {c.directorTurma} · {c.studentCount} alunos</p>
            </div>
            <StatusBadge label={c.classe + 'ª Classe'} variant="primary" />
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

export function SecretarySchedule() {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Horário</h1>
        <p className="mt-1 text-sm text-muted-foreground">Gestão de horários académicos.</p>
      </div>
      <div className="space-y-2">
        {classGroups.map(c => (
          <div key={c.id} className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm cursor-pointer transition-all">
            <div>
              <p className="text-sm font-medium text-foreground">{c.name}</p>
              <p className="text-xs text-muted-foreground">{c.studentCount} alunos · Período: 07:30–12:30</p>
            </div>
            <StatusBadge label="Ver Horário" variant="primary" />
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

export function SecretaryRegularity() {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Regularidade</h1>
        <p className="mt-1 text-sm text-muted-foreground">Conformidade e regularidade dos alunos.</p>
      </div>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatsCard label="Regulares" value={students.filter(s => s.estado !== 'em_risco').length} icon={Users} variant="primary" />
        <StatsCard label="Irregulares" value={students.filter(s => s.estado === 'em_risco').length} icon={UserCheck} />
        <StatsCard label="Total" value={students.length} icon={ClipboardList} />
      </div>
      <div className="space-y-1.5">
        {students.map(s => (
          <div key={s.id} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-bold">{s.avatar}</div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{s.name}</p>
              <p className="text-xs text-muted-foreground">{s.classe}ª {s.turma} · Média: {s.media} · Assiduidade: {s.taxaAssiduidade}%</p>
            </div>
            <StatusBadge label={s.estado === 'em_risco' ? 'Irregular' : 'Regular'} variant={s.estado === 'em_risco' ? 'destructive' : 'success'} />
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
