import { Users, BookOpen, TrendingUp, Wallet, AlertTriangle, CheckCircle, Clock, Calendar, FileText, MessageCircle, GraduationCap, ClipboardList } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/ui/section-header';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { AlertCard } from '@/components/dashboard/AlertCard';
import { QuickActionCard } from '@/components/dashboard/QuickActionCard';
import { cn } from '@/lib/utils';

/* ─── PAINEL DO ALUNO ─── */
export function StudentDashboard() {
  const navigate = useNavigate();
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">O Meu Painel</h1>
        <p className="mt-1 text-sm text-muted-foreground">Bem-vinda, Amélia. Aqui está o teu resumo académico.</p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Média" value="14.8" icon={TrendingUp} variant="primary" />
        <StatsCard label="Assiduidade" value="92%" icon={CheckCircle} />
        <StatsCard label="Disciplinas" value="9" icon={BookOpen} />
        <StatsCard label="Propinas" value="18.000 MT" icon={Wallet} />
      </div>

      <AlertCard title="Biologia precisa de atenção" description="O teu desempenho em Biologia está em 11/20. Revê os materiais recentes." variant="warning" action="Ver Disciplina" />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <SectionHeader title="Próximas Avaliações" action={<button onClick={() => navigate('/app/student/grades')} className="text-xs font-medium text-primary hover:underline">Ver Todas</button>} />
          <div className="mt-3 space-y-2">
            {[
              { title: 'ACP — Matemática', date: 'Ter 22 Abr', peso: 'ACP' },
              { title: 'ACS2 — Química', date: 'Sex 25 Abr', peso: 'ACS2' },
            ].map((e, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-warning/20 bg-warning/5 p-3">
                <Calendar className="h-4 w-4 text-warning shrink-0" />
                <div className="flex-1"><p className="text-sm font-medium text-foreground">{e.title}</p><p className="text-xs text-muted-foreground">{e.date} · {e.peso}</p></div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <SectionHeader title="Notas Recentes" action={<button onClick={() => navigate('/app/student/grades')} className="text-xs font-medium text-primary hover:underline">Todas as Notas</button>} />
          <div className="mt-3 space-y-2">
            {[
              { disciplina: 'Matemática', nota: '16/20', avaliacao: 'ACS1' },
              { disciplina: 'Física', nota: '13/20', avaliacao: 'ACS1' },
              { disciplina: 'Química', nota: '17/20', avaliacao: 'ACS1' },
            ].map((g, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-border px-4 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10"><span className="font-heading text-xs font-bold text-primary">{g.nota.split('/')[0]}</span></div>
                <div className="flex-1"><p className="text-sm font-medium text-foreground">{g.disciplina}</p><p className="text-xs text-muted-foreground">{g.avaliacao}</p></div>
                <span className="text-xs text-muted-foreground">/{g.nota.split('/')[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-5">
        <SectionHeader title="Situação Financeira" action={<button onClick={() => navigate('/app/student/finance')} className="text-xs font-medium text-primary hover:underline">Ver Detalhes</button>} />
        <div className="mt-3 flex items-center gap-6">
          <div><p className="text-xs text-muted-foreground">Total em Dívida</p><p className="font-heading text-lg font-bold text-foreground">18.000 MT</p></div>
          <div className="h-8 w-px bg-border" />
          <div><p className="text-xs text-muted-foreground">Em Atraso</p><p className="font-heading text-lg font-bold text-destructive">500 MT</p></div>
          <div className="h-8 w-px bg-border" />
          <div><p className="text-xs text-muted-foreground">Próximo Venc.</p><p className="font-heading text-lg font-bold text-warning">15 Abr</p></div>
        </div>
      </div>
    </PageContainer>
  );
}

/* ─── PAINEL DO PROFESSOR ─── */
export function TeacherDashboard() {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Painel do Professor</h1>
        <p className="mt-1 text-sm text-muted-foreground">Bem-vindo, Prof. Magaia. Aqui está o seu dia.</p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Aulas Hoje" value="4" icon={Calendar} variant="primary" />
        <StatsCard label="Alunos" value="128" icon={Users} />
        <StatsCard label="Notas Pendentes" value="12" icon={ClipboardList} trend="3 urgentes" />
        <StatsCard label="Mensagens" value="5" icon={MessageCircle} />
      </div>

      <AlertCard title="12 notas por lançar" description="As notas de ACS1 de Matemática devem ser publicadas até sexta-feira." variant="warning" action="Lançar Agora" />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <SectionHeader title="Horário de Hoje" />
          <div className="mt-3 space-y-2">
            {[
              { time: '07:30', turma: 'Matemática — 11ª A', room: 'Sala 201', current: false },
              { time: '09:15', turma: 'Matemática — 11ª B', room: 'Sala 203', current: true },
              { time: '11:00', turma: 'Estatística — 12ª A', room: 'Sala 105', current: false },
            ].map((s, i) => (
              <div key={i} className={cn('flex items-center gap-3 rounded-xl border px-4 py-3', s.current ? 'border-primary/30 bg-primary/5' : 'border-border')}>
                <span className="font-heading text-xs font-bold text-muted-foreground w-12">{s.time}</span>
                <div className="flex-1"><p className="text-sm font-medium text-foreground">{s.turma}</p><p className="text-xs text-muted-foreground">{s.room}</p></div>
                {s.current && <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">AGORA</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <SectionHeader title="Alunos em Risco" subtitle="Desempenho abaixo de 10" />
          <div className="mt-3 space-y-2">
            {[
              { name: 'Carlos Macuácua', nota: '7', disciplina: 'Matemática', trend: '↓' },
              { name: 'Fátima Nhantumbo', nota: '6', disciplina: 'Matemática', trend: '↓' },
              { name: 'Pedro Guambe', nota: '9', disciplina: 'Matemática', trend: '→' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-warning/20 bg-warning/5 px-4 py-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-warning/10 text-xs font-bold text-warning">{s.name[0]}</div>
                <div className="flex-1"><p className="text-sm font-medium text-foreground">{s.name}</p><p className="text-xs text-muted-foreground">{s.disciplina}</p></div>
                <span className="text-xs font-bold text-warning">{s.nota}/20 {s.trend}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <SectionHeader title="Acções Rápidas" />
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <QuickActionCard icon={ClipboardList} label="Lançar Notas" />
          <QuickActionCard icon={FileText} label="Publicar Conteúdo" />
          <QuickActionCard icon={MessageCircle} label="Mensagens" />
          <QuickActionCard icon={Calendar} label="Horário" />
        </div>
      </div>
    </PageContainer>
  );
}

/* ─── PAINEL DO ENCARREGADO ─── */
export function GuardianDashboard() {
  const navigate = useNavigate();
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Painel do Encarregado</h1>
        <p className="mt-1 text-sm text-muted-foreground">Acompanhamento de Amélia Mondlane.</p>
      </div>

      <div className="mb-6 rounded-2xl border border-border bg-card p-4 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 font-heading text-base font-bold text-primary">AM</div>
        <div className="flex-1">
          <p className="font-heading text-sm font-semibold text-foreground">Amélia Mondlane</p>
          <p className="text-xs text-muted-foreground">11ª A · ALU-001</p>
        </div>
        <button className="rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">Trocar Educando</button>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Média" value="14.8" icon={TrendingUp} variant="primary" />
        <StatsCard label="Assiduidade" value="92%" icon={CheckCircle} />
        <StatsCard label="Disciplinas" value="9" icon={BookOpen} />
        <StatsCard label="Propinas" value="18.000 MT" icon={Wallet} />
      </div>

      <AlertCard title="Atenção: Biologia" description="O desempenho de Amélia em Biologia está em 11/20. Pode necessitar de apoio adicional." variant="warning" action="Ver Detalhes" />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <SectionHeader title="Últimas Actualizações" action={<button onClick={() => navigate('/app/guardian/performance')} className="text-xs font-medium text-primary hover:underline">Ver Todas</button>} />
          <div className="mt-3 space-y-2">
            {[
              { title: 'Matemática — ACS1: 16/20', time: '2h atrás', type: 'nota' },
              { title: 'Física — ACS1: 13/20', time: '1d atrás', type: 'nota' },
              { title: 'Biologia — ACS1: 11/20', time: '2d atrás', type: 'alerta' },
            ].map((u, i) => (
              <div key={i} className={cn('flex items-center gap-3 rounded-xl border px-4 py-3', u.type === 'alerta' ? 'border-warning/20 bg-warning/5' : 'border-border')}>
                <GraduationCap className={cn('h-4 w-4 shrink-0', u.type === 'alerta' ? 'text-warning' : 'text-primary')} />
                <div className="flex-1"><p className="text-sm font-medium text-foreground">{u.title}</p><p className="text-xs text-muted-foreground">{u.time}</p></div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <SectionHeader title="Pagamentos Pendentes" action={<button onClick={() => navigate('/app/guardian/finance')} className="text-xs font-medium text-primary hover:underline">Ver Todos</button>} />
          <div className="mt-3 space-y-2">
            {[
              { conceito: 'Material Escolar', amount: '2.500 MT', due: '15 Abr', status: 'pendente' },
              { conceito: 'Propina — 2º Trim.', amount: '15.000 MT', due: '30 Abr', status: 'pendente' },
              { conceito: 'Multa — Atraso', amount: '500 MT', due: '15 Mar', status: 'atrasado' },
            ].map((p, i) => (
              <div key={i} className={cn('flex items-center gap-3 rounded-xl border px-4 py-3', p.status === 'atrasado' ? 'border-destructive/20 bg-destructive/5' : 'border-border')}>
                <Wallet className={cn('h-4 w-4 shrink-0', p.status === 'atrasado' ? 'text-destructive' : 'text-muted-foreground')} />
                <div className="flex-1"><p className="text-sm font-medium text-foreground">{p.conceito}</p><p className="text-xs text-muted-foreground">Venc. {p.due}</p></div>
                <span className="font-heading text-sm font-bold text-foreground">{p.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <SectionHeader title="Acções Rápidas" />
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <QuickActionCard icon={Wallet} label="Efectuar Pagamento" />
          <QuickActionCard icon={MessageCircle} label="Contactar Professor" />
          <QuickActionCard icon={GraduationCap} label="Ver Notas" />
          <QuickActionCard icon={Calendar} label="Horário" />
        </div>
      </div>
    </PageContainer>
  );
}

/* ─── PAINEL DE FINANÇAS ─── */
export function FinanceAdminDashboard() {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Painel Financeiro</h1>
        <p className="mt-1 text-sm text-muted-foreground">COREOS — Visão geral das operações financeiras.</p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Total Pendente" value="48.500 MT" icon={Clock} variant="primary" />
        <StatsCard label="Validado" value="20.000 MT" icon={CheckCircle} trend="+8% este mês" trendUp />
        <StatsCard label="Em Atraso" value="45.500 MT" icon={AlertTriangle} />
        <StatsCard label="Pagamentos Hoje" value="3" icon={Wallet} />
      </div>

      <div className="mb-6 space-y-2">
        <AlertCard title="45.500 MT em atraso em 3 alunos" description="Itens em atraso requerem acompanhamento imediato." variant="destructive" action="Analisar" />
        <AlertCard title="2 pagamentos a aguardar validação" description="Validação em lote disponível para submissões de hoje." variant="info" action="Validar" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <SectionHeader title="Pagamentos Recentes" subtitle="A aguardar validação" />
          <div className="mt-3 space-y-2">
            {[
              { aluno: 'Carlos Macuácua', amount: '15.000 MT', conceito: 'Propina 2º Trim.', time: '2h atrás' },
              { aluno: 'Rosa Tembe', amount: '15.000 MT', conceito: 'Propina 2º Trim.', time: '3h atrás' },
            ].map((p, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-border px-4 py-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-bold text-foreground">{p.aluno[0]}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{p.aluno} — {p.conceito}</p>
                  <p className="text-xs text-muted-foreground">{p.time}</p>
                </div>
                <span className="font-heading text-sm font-bold text-foreground">{p.amount}</span>
                <button className="rounded-lg bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90">Validar</button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <SectionHeader title="Itens em Atraso" subtitle="Requer acção" />
          <div className="mt-3 space-y-2">
            {[
              { aluno: 'João Sitoe', amount: '15.000 MT', conceito: 'Propina 1º Trim.', dias: 118 },
              { aluno: 'Marta Cossa', amount: '15.000 MT', conceito: 'Propina 2º Trim.', dias: 0 },
              { aluno: 'Amélia Mondlane', amount: '500 MT', conceito: 'Multa — Atraso', dias: 28 },
            ].map((o, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/10 text-xs font-bold text-destructive">{o.aluno[0]}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{o.aluno} — {o.conceito}</p>
                  <p className="text-xs text-destructive">{o.dias > 0 ? `${o.dias} dias em atraso` : 'Vence hoje'}</p>
                </div>
                <span className="font-heading text-sm font-bold text-foreground">{o.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <SectionHeader title="Acções Rápidas" />
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <QuickActionCard icon={CheckCircle} label="Validação em Lote" />
          <QuickActionCard icon={FileText} label="Gerar Relatório" />
          <QuickActionCard icon={AlertTriangle} label="Lista de Atrasos" />
          <QuickActionCard icon={Wallet} label="Registo de Pagamentos" />
        </div>
      </div>
    </PageContainer>
  );
}
