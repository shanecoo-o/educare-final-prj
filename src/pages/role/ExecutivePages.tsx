import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/ui/section-header';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { StatusBadge } from '@/components/ui/status-badge';
import { AlertCard } from '@/components/dashboard/AlertCard';
import { QuickActionCard } from '@/components/dashboard/QuickActionCard';
import { financeStats, students, classGroups, teachers } from '@/data/mockData';
import { Users, Wallet, GraduationCap, BarChart3, Shield, FileText, CheckCircle, AlertTriangle, TrendingUp, Clock } from 'lucide-react';

export function ExecutiveDashboard() {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Painel da Direcção</h1>
        <p className="mt-1 text-sm text-muted-foreground">Visão institucional e indicadores estratégicos.</p>
      </div>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Alunos" value="176" icon={Users} variant="primary" />
        <StatsCard label="Receita" value={`${(financeStats.totalValidado / 1000).toFixed(0)}K MT`} icon={Wallet} />
        <StatsCard label="Retenção" value="94%" icon={GraduationCap} />
        <StatsCard label="Crescimento" value="+12%" icon={BarChart3} />
      </div>

      <div className="mb-6 space-y-2">
        <AlertCard title={`${students.filter(s => s.estado === 'em_risco').length} alunos em risco académico`} description="Requerem acompanhamento pela coordenação pedagógica." variant="warning" action="Ver Lista" />
        <AlertCard title={`${financeStats.totalAtrasado.toLocaleString('pt-PT')} MT em atraso`} description="Propinas por cobrar em 3 alunos." variant="destructive" action="Ver Finanças" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <SectionHeader title="Resumo Académico" />
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-muted/30 transition-colors">
              <span className="text-sm text-foreground">Turmas</span>
              <span className="font-heading text-sm font-bold text-foreground">{classGroups.length}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-muted/30 transition-colors">
              <span className="text-sm text-foreground">Professores</span>
              <span className="font-heading text-sm font-bold text-foreground">{teachers.length}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-muted/30 transition-colors">
              <span className="text-sm text-foreground">Média Geral</span>
              <span className="font-heading text-sm font-bold text-foreground">12.4</span>
            </div>
            <div className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-muted/30 transition-colors">
              <span className="text-sm text-foreground">Taxa de Aprovação</span>
              <span className="font-heading text-sm font-bold text-foreground">78%</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <SectionHeader title="Resumo Financeiro" />
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-muted/30 transition-colors">
              <span className="text-sm text-foreground">Validado</span>
              <span className="font-heading text-sm font-bold text-success">{financeStats.totalValidado.toLocaleString('pt-PT')} MT</span>
            </div>
            <div className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-muted/30 transition-colors">
              <span className="text-sm text-foreground">Pendente</span>
              <span className="font-heading text-sm font-bold text-warning">{financeStats.totalPendente.toLocaleString('pt-PT')} MT</span>
            </div>
            <div className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-muted/30 transition-colors">
              <span className="text-sm text-foreground">Em Atraso</span>
              <span className="font-heading text-sm font-bold text-destructive">{financeStats.totalAtrasado.toLocaleString('pt-PT')} MT</span>
            </div>
            <div className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-muted/30 transition-colors">
              <span className="text-sm text-foreground">Taxa de Cobrança</span>
              <span className="font-heading text-sm font-bold text-foreground">68%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <SectionHeader title="Acções Rápidas" />
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <QuickActionCard icon={BarChart3} label="Relatórios" />
          <QuickActionCard icon={Wallet} label="Finanças" />
          <QuickActionCard icon={Users} label="Matrículas" />
          <QuickActionCard icon={Shield} label="Auditoria" />
        </div>
      </div>
    </PageContainer>
  );
}

export function ExecutiveFinance() {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Visão Financeira</h1>
        <p className="mt-1 text-sm text-muted-foreground">Resumo financeiro de alto nível.</p>
      </div>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Validado" value={`${financeStats.totalValidado.toLocaleString('pt-PT')} MT`} icon={CheckCircle} variant="primary" />
        <StatsCard label="Pendente" value={`${financeStats.totalPendente.toLocaleString('pt-PT')} MT`} icon={Clock} />
        <StatsCard label="Em Atraso" value={`${financeStats.totalAtrasado.toLocaleString('pt-PT')} MT`} icon={AlertTriangle} />
        <StatsCard label="Inadimplentes" value={financeStats.alunosInadimplentes} icon={Users} />
      </div>
      <div className="rounded-2xl border border-border bg-card p-5">
        <SectionHeader title="Indicadores Financeiros" />
        <div className="mt-4 space-y-4">
          <div>
            <div className="flex justify-between mb-1"><span className="text-xs text-muted-foreground">Taxa de Cobrança</span><span className="text-xs font-medium text-foreground">68%</span></div>
            <div className="h-2 w-full rounded-full bg-muted"><div className="h-2 rounded-full bg-primary" style={{ width: '68%' }} /></div>
          </div>
          <div>
            <div className="flex justify-between mb-1"><span className="text-xs text-muted-foreground">Pagamento Pontual</span><span className="text-xs font-medium text-foreground">82%</span></div>
            <div className="h-2 w-full rounded-full bg-muted"><div className="h-2 rounded-full bg-success" style={{ width: '82%' }} /></div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export function ExecutiveAcademic() {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Visão Académica</h1>
        <p className="mt-1 text-sm text-muted-foreground">Desempenho académico institucional.</p>
      </div>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Média Geral" value="12.4" icon={TrendingUp} variant="primary" />
        <StatsCard label="Aprovação" value="78%" icon={CheckCircle} />
        <StatsCard label="Excelentes" value={students.filter(s => s.estado === 'excelente').length} icon={GraduationCap} />
        <StatsCard label="Em Risco" value={students.filter(s => s.estado === 'em_risco').length} icon={AlertTriangle} />
      </div>
      <div className="rounded-2xl border border-border bg-card p-5">
        <SectionHeader title="Desempenho por Turma" />
        <div className="mt-3 space-y-2">
          {classGroups.map(c => (
            <div key={c.id} className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-muted/30 transition-colors">
              <span className="text-sm font-medium text-foreground">{c.name}</span>
              <span className="text-xs text-muted-foreground">{c.studentCount} alunos · Dir.: {c.directorTurma}</span>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}

export function ExecutiveEnrollment() {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Matrículas</h1>
        <p className="mt-1 text-sm text-muted-foreground">Estatísticas e tendências de matrículas.</p>
      </div>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatsCard label="Total Matriculados" value="176" icon={Users} variant="primary" />
        <StatsCard label="Novos (mês)" value="3" icon={GraduationCap} />
        <StatsCard label="Taxa Retenção" value="94%" icon={TrendingUp} />
      </div>
      <div className="rounded-2xl border border-border bg-card p-5">
        <SectionHeader title="Distribuição por Classe" />
        <div className="mt-3 space-y-2">
          {classGroups.map(c => (
            <div key={c.id} className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-muted/30 transition-colors">
              <span className="text-sm font-medium text-foreground">{c.name}</span>
              <StatusBadge label={`${c.studentCount} alunos`} variant="muted" />
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}

export function ExecutiveReports() {
  const reports = [
    { name: 'Relatório Institucional', period: '2025-2026', status: 'pronto' },
    { name: 'Indicadores de Desempenho', period: '2º Trimestre', status: 'pronto' },
    { name: 'Relatório Financeiro', period: 'Abril 2026', status: 'pronto' },
    { name: 'Análise de Retenção', period: 'Anual', status: 'pendente' },
  ];

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Relatórios</h1>
        <p className="mt-1 text-sm text-muted-foreground">Relatórios estratégicos e analítica.</p>
      </div>
      <div className="space-y-1.5">
        {reports.map((r, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm transition-all">
            <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="flex-1">
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

export function ExecutiveAudit() {
  const logs = [
    { action: 'Validação de pagamento', user: 'Tesoureiro', time: '2h atrás', details: 'PAG-006 — 5.000 MT validado' },
    { action: 'Lançamento de notas', user: 'Prof. Magaia', time: '4h atrás', details: 'ACS1 Matemática — 11ª A' },
    { action: 'Admissão aprovada', user: 'Secretaria', time: '1d atrás', details: 'Bruno Nhanala — 11ª Classe' },
    { action: 'Relatório gerado', user: 'Sistema', time: '2d atrás', details: 'Relatório mensal de receitas' },
  ];

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Auditoria</h1>
        <p className="mt-1 text-sm text-muted-foreground">Registos de auditoria e conformidade.</p>
      </div>
      <div className="space-y-1.5">
        {logs.map((l, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
            <Shield className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{l.action}</p>
              <p className="text-xs text-muted-foreground">{l.user} · {l.time} · {l.details}</p>
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
