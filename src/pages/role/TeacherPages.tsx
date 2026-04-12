import { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/ui/section-header';
import { ScheduleView } from '@/components/academic/ScheduleView';
import { StatusBadge } from '@/components/ui/status-badge';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { AlertCard } from '@/components/dashboard/AlertCard';
import {
  teachers, classGroups, students, teacherSchedule, assessments, knowledgeItems, grades, attendanceRecords
} from '@/data/mockData';
import {
  Calendar, Users, ClipboardList, BookOpen, CheckCircle, FileText,
  MessageCircle, Bell, GraduationCap, Clock, Plus, Save, Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

const currentTeacher = teachers[0]; // Prof. Magaia

export { TeacherDashboard } from '@/pages/app/RoleDashboards';

/* ─── HORÁRIO ─── */
export function TeacherSchedule() {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">O Meu Horário</h1>
        <p className="mt-1 text-sm text-muted-foreground">Horário de leccionação — 07:30 às 12:30.</p>
      </div>
      <ScheduleView schedule={teacherSchedule} showTeacher={false} showClassGroup />
    </PageContainer>
  );
}

/* ─── TURMAS ─── */
export function TeacherClasses() {
  const myClasses = classGroups.filter(c => ['11ª A', '11ª B', '10ª A', '10ª B', '12ª A', '12ª B'].includes(c.name));

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">As Minhas Turmas</h1>
        <p className="mt-1 text-sm text-muted-foreground">Gestão de turmas e alunos.</p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Turmas" value={currentTeacher.numTurmas} icon={Users} variant="primary" />
        <StatsCard label="Alunos" value={currentTeacher.numAlunos} icon={GraduationCap} />
        <StatsCard label="Disciplinas" value={currentTeacher.disciplinas.length} icon={BookOpen} />
        <StatsCard label="Em Risco" value={2} icon={Clock} trend="Requer atenção" />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {myClasses.slice(0, 4).map(cls => (
          <div key={cls.id} className="rounded-2xl border border-border bg-card p-5 hover:shadow-sm hover:border-primary/10 transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-heading text-sm font-semibold text-foreground">{cls.name}</h3>
              <StatusBadge label={`${cls.studentCount} alunos`} variant="muted" />
            </div>
            <p className="text-xs text-muted-foreground mb-3">Dir. Turma: {cls.directorTurma}</p>
            <div className="flex gap-2">
              {currentTeacher.disciplinas.slice(0, 2).map((sub, i) => (
                <StatusBadge key={i} label={sub} variant="primary" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

/* ─── PRESENÇAS ─── */
export function TeacherAttendance() {
  const classStudents = students.slice(0, 6);
  const [attendanceState, setAttendanceState] = useState<Record<string, string>>(
    Object.fromEntries(classStudents.map(s => [s.id, 'presente']))
  );

  return (
    <PageContainer>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Presenças</h1>
          <p className="mt-1 text-sm text-muted-foreground">Matemática — 11ª A · {new Date().toLocaleDateString('pt-PT', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors active:scale-95">
          <Save className="h-4 w-4" />
          Guardar
        </button>
      </div>

      <div className="space-y-1.5">
        {classStudents.map(s => (
          <div key={s.id} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted font-heading text-xs font-bold text-foreground">{s.avatar}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{s.name}</p>
              <p className="text-xs text-muted-foreground">{s.id} · Taxa: {s.taxaAssiduidade}%</p>
            </div>
            <div className="flex gap-1">
              {(['presente', 'falta', 'atraso'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => setAttendanceState(prev => ({ ...prev, [s.id]: status }))}
                  className={cn(
                    'rounded-lg px-2.5 py-1 text-xs font-medium transition-all active:scale-95',
                    attendanceState[s.id] === status
                      ? status === 'presente' ? 'bg-success text-success-foreground' : status === 'falta' ? 'bg-destructive text-destructive-foreground' : 'bg-warning text-warning-foreground'
                      : 'bg-muted text-muted-foreground hover:text-foreground'
                  )}
                >
                  {status === 'presente' ? 'Presente' : status === 'falta' ? 'Falta' : 'Atraso'}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

/* ─── LANÇAMENTO DE NOTAS ─── */
export function TeacherGradebook() {
  const classStudents = students.slice(0, 6);

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Lançamento de Notas</h1>
        <p className="mt-1 text-sm text-muted-foreground">Matemática — 11ª A · 2º Trimestre · MT = (ACS1 + ACS2 + ACP) / 3</p>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Aluno</th>
                <th className="text-center px-3 py-3 font-medium text-muted-foreground">ACS1</th>
                <th className="text-center px-3 py-3 font-medium text-muted-foreground">ACS2</th>
                <th className="text-center px-3 py-3 font-medium text-muted-foreground">ACP</th>
                <th className="text-center px-3 py-3 font-medium text-muted-foreground">MT</th>
              </tr>
            </thead>
            <tbody>
              {classStudents.map(s => {
                const sg = grades.filter(g => g.studentId === s.id && g.subjectName === 'Matemática' && g.trimestre === 2);
                const acs1 = sg.find(g => g.tipo === 'ACS1');
                const acs2 = sg.find(g => g.tipo === 'ACS2');
                const acp = sg.find(g => g.tipo === 'ACP');
                const vals = [acs1?.nota, acs2?.nota, acp?.nota].filter((v): v is number => v !== undefined);
                const mt = vals.length > 0 ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length * 10) / 10 : null;
                return (
                  <tr key={s.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-[10px] font-bold">{s.avatar}</div>
                        <span className="font-medium text-foreground">{s.name}</span>
                      </div>
                    </td>
                    <td className="text-center px-3 py-3 font-heading font-bold">{acs1 ? `${acs1.nota}` : '—'}</td>
                    <td className="text-center px-3 py-3 font-heading font-bold">{acs2 ? `${acs2.nota}` : '—'}</td>
                    <td className="text-center px-3 py-3 font-heading font-bold">{acp ? `${acp.nota}` : '—'}</td>
                    <td className="text-center px-3 py-3">
                      <span className={cn('font-heading font-bold', mt !== null && mt >= 14 ? 'text-success' : mt !== null && mt >= 10 ? 'text-warning' : mt !== null ? 'text-destructive' : '')}>
                        {mt ?? '—'}
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

/* ─── AVALIAÇÕES ─── */
export function TeacherAssessments() {
  const statusVariant = (s: string) => s === 'corrigido' ? 'success' as const : s === 'agendado' ? 'warning' as const : s === 'publicado' ? 'info' as const : 'muted' as const;
  const statusLabel = (s: string) => s === 'corrigido' ? 'Corrigido' : s === 'agendado' ? 'Agendado' : s === 'publicado' ? 'Publicado' : 'Rascunho';

  return (
    <PageContainer>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Avaliações</h1>
          <p className="mt-1 text-sm text-muted-foreground">Criar e gerir avaliações (ACS1, ACS2, ACP).</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors active:scale-95">
          <Plus className="h-4 w-4" />
          Nova
        </button>
      </div>

      <div className="space-y-2">
        {assessments.map(a => (
          <div key={a.id} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm transition-all">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{a.title} — {a.disciplina}</p>
              <p className="text-xs text-muted-foreground">{a.turma} · {new Date(a.date).toLocaleDateString('pt-PT', { month: 'short', day: 'numeric' })} · {a.tipo}</p>
            </div>
            <div className="text-right shrink-0">
              {(a.status === 'corrigido' || a.status === 'publicado') && (
                <p className="text-xs text-muted-foreground">{a.corrigidos}/{a.totalAlunos} corrigidos</p>
              )}
            </div>
            <StatusBadge label={statusLabel(a.status)} variant={statusVariant(a.status)} />
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

/* ─── CONTEÚDOS ─── */
export function TeacherKnowledge() {
  const myMaterials = knowledgeItems.filter(k => k.author === currentTeacher.name);

  return (
    <PageContainer>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Conteúdos</h1>
          <p className="mt-1 text-sm text-muted-foreground">Publicar materiais de aprendizagem.</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors active:scale-95">
          <Plus className="h-4 w-4" />
          Carregar
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {myMaterials.map(item => (
          <div key={item.id} className="rounded-2xl border border-border bg-card p-4 hover:shadow-sm transition-all">
            <h3 className="text-sm font-medium text-foreground">{item.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{item.description}</p>
            <div className="mt-3 flex items-center gap-2">
              <StatusBadge label={item.type === 'documento' ? 'Documento' : item.type === 'video' ? 'Vídeo' : item.type} variant="primary" />
              <StatusBadge label={item.disciplina} variant="muted" />
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
    { name: 'Turma 11ª A', lastMessage: 'Calendário de provas confirmado', time: '1h atrás', unread: 5 },
    { name: 'Amélia Mondlane', lastMessage: 'Obrigada pelo feedback!', time: '3h atrás', unread: 0 },
    { name: 'Prof.ª Graça Machel', lastMessage: 'Podemos coordenar os horários?', time: '1d atrás', unread: 1 },
    { name: 'Coordenação Académica', lastMessage: 'Lembrete: prazo de lançamento de notas', time: '2d atrás', unread: 0 },
  ];

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Chat</h1>
        <p className="mt-1 text-sm text-muted-foreground">Mensagens com alunos e colegas.</p>
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
export function TeacherNotifications() {
  const items = [
    { title: '12 notas por lançar', message: 'As notas de ACS1 de Matemática devem ser publicadas até sexta-feira.', type: 'alerta', time: '1h atrás', read: false },
    { title: 'Relatório de Lab #5', message: '18 de 28 alunos entregaram.', type: 'nota', time: '3h atrás', read: false },
    { title: 'Reunião de coordenação', message: 'Quinta-feira às 14h na Sala 101.', type: 'aviso', time: '1d atrás', read: true },
    { title: 'Alteração de horário', message: 'Matemática 12ª A transferida para Sala 108 na próxima semana.', type: 'aviso', time: '2d atrás', read: true },
  ];

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Notificações</h1>
        <p className="mt-1 text-sm text-muted-foreground">Alertas e avisos.</p>
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
