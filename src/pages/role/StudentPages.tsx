import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/ui/section-header';
import { ScheduleView } from '@/components/academic/ScheduleView';
import { StatusBadge } from '@/components/ui/status-badge';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { AlertCard } from '@/components/dashboard/AlertCard';
import {
  students, subjects, grades, attendanceRecords, weeklySchedule, payments,
  notifications, feedItems, knowledgeItems,
  getStudentGrades, getStudentPayments, getSubjectAverage, calcMT
} from '@/data/mockData';
import {
  TrendingUp, CheckCircle, BookOpen, Wallet, Calendar, ClipboardList,
  Clock, FileText, MessageCircle, Bell, GraduationCap,
  Video, Link as LinkIcon, HelpCircle, Presentation, Filter, Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

const currentStudent = students[0]; // Amélia
const studentGrades = getStudentGrades('ALU-001');
const studentPayments = getStudentPayments('ALU-001');

export { StudentDashboard } from '@/pages/app/RoleDashboards';

/* ─── NOTAS ─── */
export function StudentGrades() {
  const subjectAverages = subjects.map(sub => ({
    ...sub,
    average: getSubjectAverage('ALU-001', sub.id),
    mt: calcMT('ALU-001', sub.id, 2),
    grades: studentGrades.filter(g => g.subjectId === sub.id),
  })).filter(s => s.grades.length > 0);

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">As Minhas Notas</h1>
        <p className="mt-1 text-sm text-muted-foreground">Desempenho académico — 2º Trimestre. Escala: 0–20. Aprovação: MA ≥ 10.</p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Média" value={currentStudent.media.toFixed(1)} icon={TrendingUp} variant="primary" />
        <StatsCard label="Disciplinas" value={subjects.length} icon={BookOpen} />
        <StatsCard label="Avaliações" value={studentGrades.length} icon={ClipboardList} />
        <StatsCard label="Melhor" value="Inglês" icon={GraduationCap} />
      </div>

      <div className="space-y-3">
        {subjectAverages.map(sub => (
          <div key={sub.id} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-sm font-semibold text-foreground">{sub.name}</h3>
                {sub.tipo === 'extracurricular' && (
                  <span className="flex items-center gap-0.5 rounded-md bg-accent px-1.5 py-0.5 text-[10px] font-medium text-accent-foreground">
                    <Sparkles className="h-2.5 w-2.5" /> Extra
                  </span>
                )}
              </div>
              <div className="text-right">
                <span className="font-heading text-xl font-bold text-foreground">{sub.mt ?? sub.average}</span>
                <span className="text-sm text-muted-foreground">/20</span>
              </div>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted mb-3">
              <div
                className={cn('h-1.5 rounded-full transition-all', (sub.mt ?? sub.average) >= 14 ? 'bg-success' : (sub.mt ?? sub.average) >= 10 ? 'bg-warning' : 'bg-destructive')}
                style={{ width: `${((sub.mt ?? sub.average) / 20) * 100}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mb-2">{sub.teacherName} · {sub.code}</p>
            {sub.grades.length > 0 && (
              <div className="space-y-1">
                {sub.grades.map(g => (
                  <div key={g.id} className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2">
                      <StatusBadge label={g.tipo} variant={g.tipo === 'ACP' ? 'primary' : g.tipo === 'ACS2' ? 'info' : 'muted'} />
                      <span className="text-sm text-foreground">{g.avaliacao}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading text-sm font-bold text-foreground">{g.nota}/{g.maxNota}</span>
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

/* ─── ASSIDUIDADE ─── */
export function StudentAttendance() {
  const records = attendanceRecords.filter(a => a.studentId === 'ALU-001');
  const presentCount = records.filter(r => r.status === 'presente').length;
  const absentCount = records.filter(r => r.status === 'falta').length;
  const lateCount = records.filter(r => r.status === 'atraso').length;
  const justifiedCount = records.filter(r => r.status === 'justificada').length;

  const statusVariant = (s: string) => s === 'presente' ? 'success' as const : s === 'falta' ? 'destructive' as const : s === 'atraso' ? 'warning' as const : 'info' as const;
  const statusLabel = (s: string) => s === 'presente' ? 'Presente' : s === 'falta' ? 'Falta' : s === 'atraso' ? 'Atraso' : 'Justificada';

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Assiduidade</h1>
        <p className="mt-1 text-sm text-muted-foreground">Registo de presenças por disciplina. Limiar crítico: 25% de faltas.</p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Taxa" value={`${currentStudent.taxaAssiduidade}%`} icon={CheckCircle} variant="primary" />
        <StatsCard label="Presenças" value={presentCount} icon={CheckCircle} />
        <StatsCard label="Faltas" value={absentCount} icon={Clock} />
        <StatsCard label="Atrasos" value={lateCount} icon={Clock} />
      </div>

      {absentCount > 0 && (
        <AlertCard title={`${absentCount} falta(s) registada(s)`} description="Contacte o director de turma se alguma falta necessitar de justificação." variant="warning" className="mb-4" />
      )}

      <SectionHeader title="Registos Recentes" className="mb-3" />
      <div className="space-y-1.5">
        {records.map(r => (
          <div key={r.id} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
            <div className="w-20 shrink-0">
              <p className="text-xs font-medium text-foreground">{new Date(r.date).toLocaleDateString('pt-PT', { month: 'short', day: 'numeric' })}</p>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground truncate">{r.disciplina}</p>
              {r.nota && <p className="text-xs text-muted-foreground">{r.nota}</p>}
            </div>
            <StatusBadge label={statusLabel(r.status)} variant={statusVariant(r.status)} dot />
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

/* ─── HORÁRIO ─── */
export function StudentSchedule() {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Horário</h1>
        <p className="mt-1 text-sm text-muted-foreground">Horário semanal — 07:30 às 12:30.</p>
      </div>
      <ScheduleView schedule={weeklySchedule} showTeacher />
    </PageContainer>
  );
}

/* ─── AGENDA ─── */
export function StudentAgenda() {
  const upcoming = [
    { title: 'ACP — Matemática', date: 'Ter, 22 Abr', type: 'ACP' },
    { title: 'ACS2 — Química', date: 'Sex, 25 Abr', type: 'ACS2' },
    { title: 'ACS2 — Português', date: 'Ter, 15 Abr', type: 'ACS2' },
    { title: 'Visita de Estudo — Biologia', date: 'Sex, 18 Abr', type: 'evento' },
    { title: 'Pagamento de Propina', date: '30 Abr', type: 'pagamento' },
  ];

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Agenda</h1>
        <p className="mt-1 text-sm text-muted-foreground">Agenda pessoal e lembretes.</p>
      </div>

      <SectionHeader title="Próximos" className="mb-3" />
      <div className="space-y-1.5">
        {upcoming.map((item, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm transition-all">
            <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.date}</p>
            </div>
            <StatusBadge label={item.type} variant={item.type === 'ACP' ? 'destructive' : item.type === 'pagamento' ? 'warning' : 'muted'} />
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

/* ─── CONTEÚDOS ─── */
export function StudentKnowledge() {
  const [filter, setFilter] = useState<string>('all');
  const disciplinaNames = [...new Set(knowledgeItems.map(k => k.disciplina))];
  const filtered = filter === 'all' ? knowledgeItems : knowledgeItems.filter(k => k.disciplina === filter);

  const typeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'questionario': return <HelpCircle className="h-4 w-4" />;
      case 'apresentacao': return <Presentation className="h-4 w-4" />;
      case 'link': return <LinkIcon className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Conteúdos</h1>
        <p className="mt-1 text-sm text-muted-foreground">Materiais de aprendizagem e recursos.</p>
      </div>

      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        <button onClick={() => setFilter('all')} className={cn('rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap', filter === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground')}>Todas</button>
        {disciplinaNames.map(s => (
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
                  <StatusBadge label={item.disciplina} variant="primary" />
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

/* ─── ACTUALIZAÇÕES ─── */
export function StudentFeed() {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Actualizações</h1>
        <p className="mt-1 text-sm text-muted-foreground">Últimas novidades da escola.</p>
      </div>

      <div className="space-y-3">
        {feedItems.map(item => (
          <div key={item.id} className={cn('rounded-2xl border bg-card p-5 transition-all', item.pinned ? 'border-primary/20 bg-primary/[0.02]' : 'border-border')}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-bold text-foreground">{item.author[0]}</div>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.author}</p>
                  <p className="text-[10px] text-muted-foreground">{item.authorRole} · {new Date(item.timestamp).toLocaleDateString('pt-PT', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {item.pinned && <StatusBadge label="Fixo" variant="primary" />}
                <StatusBadge label={item.category === 'aviso' ? 'Aviso' : item.category === 'evento' ? 'Evento' : item.category === 'academico' ? 'Académico' : 'Geral'} variant={item.category === 'aviso' ? 'info' : item.category === 'evento' ? 'warning' : 'muted'} />
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
    { name: 'Prof. António Magaia', lastMessage: 'Excelente desempenho na ACS1!', time: '2h atrás', unread: 1 },
    { name: 'Prof.ª Graça Machel', lastMessage: 'Não se esqueça do relatório #5', time: '1d atrás', unread: 0 },
    { name: 'Prof. Ernesto Vilankulo', lastMessage: 'Detalhes da visita de estudo', time: '2d atrás', unread: 0 },
    { name: 'Turma 11ª A', lastMessage: 'Alguém tem apontamentos de Quarta?', time: '3h atrás', unread: 3 },
  ];

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Chat</h1>
        <p className="mt-1 text-sm text-muted-foreground">Mensagens com professores e colegas.</p>
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

/* ─── NOTIFICAÇÕES ─── */
export function StudentNotifications() {
  const typeIcon = (type: string) => {
    switch (type) {
      case 'nota': return <GraduationCap className="h-4 w-4 text-primary" />;
      case 'assiduidade': return <CheckCircle className="h-4 w-4 text-warning" />;
      case 'pagamento': return <Wallet className="h-4 w-4 text-destructive" />;
      case 'alerta': return <Clock className="h-4 w-4 text-warning" />;
      case 'mensagem': return <MessageCircle className="h-4 w-4 text-info" />;
      default: return <Bell className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Notificações</h1>
        <p className="mt-1 text-sm text-muted-foreground">Alertas e avisos.</p>
      </div>

      <div className="space-y-1.5">
        {notifications.map(n => (
          <div key={n.id} className={cn('flex items-start gap-3 rounded-xl border px-4 py-3 transition-all', n.read ? 'border-border bg-card' : 'border-primary/20 bg-primary/[0.02]')}>
            <div className="mt-0.5 shrink-0">{typeIcon(n.type)}</div>
            <div className="flex-1 min-w-0">
              <p className={cn('text-sm', n.read ? 'text-foreground' : 'font-medium text-foreground')}>{n.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{new Date(n.timestamp).toLocaleDateString('pt-PT', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            {!n.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />}
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

/* ─── FINANÇAS ─── */
export function StudentFinance() {
  const pending = studentPayments.filter(p => ['pendente', 'atrasado', 'parcial'].includes(p.status));
  const history = studentPayments.filter(p => ['pago', 'validado'].includes(p.status));
  const totalDue = pending.reduce((s, p) => s + (p.amount - p.paidAmount), 0);
  const hasDebt = pending.some(p => p.status === 'atrasado');

  const statusVariant = (s: string) => s === 'pago' || s === 'validado' ? 'success' as const : s === 'atrasado' ? 'destructive' as const : s === 'parcial' ? 'warning' as const : 'muted' as const;
  const statusLabel = (s: string) => s === 'pago' ? 'Pago' : s === 'validado' ? 'Validado' : s === 'atrasado' ? 'Atrasado' : s === 'parcial' ? 'Parcial' : 'Pendente';

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">As Minhas Finanças</h1>
        <p className="mt-1 text-sm text-muted-foreground">Propinas, pagamentos e recibos.</p>
      </div>

      {hasDebt && (
        <AlertCard title="⚠️ Situação financeira bloqueada" description="Tem pagamentos em atraso. Regularize a situação para evitar penalizações." variant="destructive" className="mb-4" />
      )}

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatsCard label="Total em Dívida" value={`${totalDue.toLocaleString('pt-PT')} MT`} icon={Wallet} variant="primary" />
        <StatsCard label="Em Atraso" value={`${pending.filter(p => p.status === 'atrasado').reduce((s, p) => s + p.amount, 0).toLocaleString('pt-PT')} MT`} icon={Clock} />
        <StatsCard label="Pago Este Ano" value={`${history.reduce((s, p) => s + p.paidAmount, 0).toLocaleString('pt-PT')} MT`} icon={CheckCircle} />
      </div>

      <SectionHeader title="Pendentes" className="mb-3" />
      <div className="space-y-1.5 mb-6">
        {pending.map(p => (
          <div key={p.id} className={cn('flex items-center gap-3 rounded-xl border bg-card px-4 py-3', p.status === 'atrasado' ? 'border-destructive/20' : 'border-border')}>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{p.conceito}</p>
              <p className="text-xs text-muted-foreground">Venc. {new Date(p.dueDate).toLocaleDateString('pt-PT', { month: 'short', day: 'numeric' })}</p>
            </div>
            <span className={cn('font-heading text-sm font-bold', p.status === 'atrasado' ? 'text-destructive' : 'text-foreground')}>{p.amount.toLocaleString('pt-PT')} MT</span>
            <StatusBadge label={statusLabel(p.status)} variant={statusVariant(p.status)} />
          </div>
        ))}
      </div>

      <SectionHeader title="Histórico de Pagamentos" className="mb-3" />
      <div className="space-y-1.5">
        {history.map(p => (
          <div key={p.id} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{p.conceito}</p>
              <p className="text-xs text-muted-foreground">Pago {p.paidDate && new Date(p.paidDate).toLocaleDateString('pt-PT', { month: 'short', day: 'numeric' })} · {p.metodo}</p>
            </div>
            <span className="font-heading text-sm font-bold text-foreground">{p.paidAmount.toLocaleString('pt-PT')} MT</span>
            <StatusBadge label="Pago" variant="success" />
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
