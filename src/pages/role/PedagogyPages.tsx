import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/ui/section-header';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { StatusBadge } from '@/components/ui/status-badge';
import { AlertCard } from '@/components/dashboard/AlertCard';
import { students, classGroups, teachers, attendanceRecords } from '@/data/mockData';
import { BarChart3, Users, CheckCircle, AlertTriangle, Calendar, FileText, BookOpen, UserCheck, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PedagogyDashboard() {
  const atRisk = students.filter(s => s.estado === 'em_risco');
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Coordenação Académica</h1>
        <p className="mt-1 text-sm text-muted-foreground">Visão geral das operações académicas e desempenho dos alunos.</p>
      </div>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Alunos" value="176" icon={Users} variant="primary" />
        <StatsCard label="Assiduidade" value="84%" icon={CheckCircle} />
        <StatsCard label="Em Risco" value={atRisk.length} icon={AlertTriangle} />
        <StatsCard label="Professores" value={teachers.length} icon={UserCheck} />
      </div>

      <AlertCard title={`${atRisk.length} alunos em risco académico`} description="Alunos com média inferior a 10 ou assiduidade abaixo de 75%." variant="warning" action="Ver Lista" className="mb-6" />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <SectionHeader title="Alunos em Risco" />
          <div className="mt-3 space-y-2">
            {atRisk.map(s => (
              <div key={s.id} className="flex items-center gap-3 rounded-xl border border-warning/20 bg-warning/5 px-4 py-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-warning/10 text-xs font-bold text-warning">{s.avatar}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.classe}ª {s.turma} · Média: {s.media} · Assiduidade: {s.taxaAssiduidade}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <SectionHeader title="Turmas" />
          <div className="mt-3 space-y-2">
            {classGroups.map(c => (
              <div key={c.id} className="flex items-center justify-between rounded-xl border border-border px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{c.name}</p>
                  <p className="text-xs text-muted-foreground">Dir. Turma: {c.directorTurma}</p>
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

export function PedagogyAnalytics() {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Analítica</h1>
        <p className="mt-1 text-sm text-muted-foreground">Tendências de desempenho e análise estatística.</p>
      </div>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Média Geral" value="12.4" icon={BarChart3} variant="primary" />
        <StatsCard label="Taxa Aprovação" value="78%" icon={CheckCircle} />
        <StatsCard label="Em Risco" value="3" icon={AlertTriangle} />
        <StatsCard label="Excelentes" value="2" icon={Users} />
      </div>
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <p className="text-sm text-muted-foreground">Gráficos e dashboards de analítica detalhada serão exibidos aqui.</p>
      </div>
    </PageContainer>
  );
}

export function PedagogyClasses() {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Turmas</h1>
        <p className="mt-1 text-sm text-muted-foreground">Gestão de turmas e configurações.</p>
      </div>
      <div className="space-y-2">
        {classGroups.map(c => (
          <div key={c.id} className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm transition-all cursor-pointer">
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

export function PedagogyTeachers() {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Professores</h1>
        <p className="mt-1 text-sm text-muted-foreground">Gestão e atribuições de professores.</p>
      </div>
      <div className="space-y-2">
        {teachers.map(t => (
          <div key={t.id} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm transition-all">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{t.name.split(' ').pop()?.[0]}</div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.departamento} · {t.numTurmas} turmas · {t.numAlunos} alunos</p>
            </div>
            <div className="flex gap-1">
              {t.disciplinas.map((d, i) => (
                <StatusBadge key={i} label={d} variant="muted" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

export function PedagogyAttendance() {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Assiduidade</h1>
        <p className="mt-1 text-sm text-muted-foreground">Visão institucional de assiduidade.</p>
      </div>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Taxa Geral" value="84%" icon={CheckCircle} variant="primary" />
        <StatsCard label="Faltas Hoje" value={attendanceRecords.filter(r => r.status === 'falta').length} icon={AlertTriangle} />
        <StatsCard label="Atrasos Hoje" value={attendanceRecords.filter(r => r.status === 'atraso').length} icon={Clock} />
        <StatsCard label="Justificadas" value={attendanceRecords.filter(r => r.status === 'justificada').length} icon={FileText} />
      </div>
      <div className="rounded-2xl border border-border bg-card p-5">
        <SectionHeader title="Faltas por Turma" />
        <div className="mt-3 space-y-2">
          {classGroups.map(c => (
            <div key={c.id} className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-muted/30 transition-colors">
              <span className="text-sm font-medium text-foreground">{c.name}</span>
              <span className="text-xs text-muted-foreground">{Math.floor(Math.random() * 5)} faltas hoje</span>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}

export function PedagogySchedule() {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Horário</h1>
        <p className="mt-1 text-sm text-muted-foreground">Gestão de horários académicos.</p>
      </div>
      <div className="rounded-2xl border border-border bg-card p-5">
        <SectionHeader title="Horários por Turma" />
        <div className="mt-3 space-y-2">
          {classGroups.map(c => (
            <div key={c.id} className="flex items-center justify-between rounded-xl border border-border px-4 py-3 hover:shadow-sm cursor-pointer transition-all">
              <div>
                <p className="text-sm font-medium text-foreground">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.studentCount} alunos · {c.directorTurma}</p>
              </div>
              <StatusBadge label="Ver Horário" variant="primary" />
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}

export function PedagogyRisk() {
  const atRisk = students.filter(s => s.estado === 'em_risco');
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Gestão de Risco</h1>
        <p className="mt-1 text-sm text-muted-foreground">Alunos em risco académico (média &lt; 10 ou assiduidade &lt; 75%).</p>
      </div>
      <AlertCard title={`${atRisk.length} alunos requerem intervenção`} description="Estes alunos apresentam indicadores académicos preocupantes." variant="destructive" className="mb-6" />
      <div className="space-y-2">
        {atRisk.map(s => (
          <div key={s.id} className="rounded-xl border border-destructive/20 bg-destructive/[0.02] p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-sm font-bold text-destructive">{s.avatar}</div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.classe}ª {s.turma} · {s.id}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-muted/50 p-2 text-center">
                <p className="text-[10px] text-muted-foreground">Média</p>
                <p className={cn('font-heading text-sm font-bold', s.media < 10 ? 'text-destructive' : 'text-warning')}>{s.media}</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-2 text-center">
                <p className="text-[10px] text-muted-foreground">Assiduidade</p>
                <p className={cn('font-heading text-sm font-bold', s.taxaAssiduidade < 75 ? 'text-destructive' : 'text-warning')}>{s.taxaAssiduidade}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

export function PedagogyReports() {
  const reports = [
    { name: 'Relatório de Desempenho por Turma', period: '2º Trimestre 2026', status: 'pronto' },
    { name: 'Análise de Assiduidade', period: 'Abril 2026', status: 'pronto' },
    { name: 'Lista de Alunos em Risco', period: 'Actual', status: 'pronto' },
    { name: 'Relatório Anual Académico', period: '2025-2026', status: 'pendente' },
  ];

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Relatórios</h1>
        <p className="mt-1 text-sm text-muted-foreground">Relatórios académicos e de desempenho.</p>
      </div>
      <div className="space-y-1.5">
        {reports.map((r, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm transition-all">
            <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{r.name}</p>
              <p className="text-xs text-muted-foreground">{r.period}</p>
            </div>
            <StatusBadge label={r.status === 'pronto' ? 'Pronto' : 'Pendente'} variant={r.status === 'pronto' ? 'success' : 'muted'} />
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
