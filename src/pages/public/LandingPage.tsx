import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, GraduationCap, Wallet, BookOpen, Users, ShieldCheck, BarChart3, CheckCircle2 } from 'lucide-react';
import { Brand } from '@/components/shared/Brand';
import { PublicFooter } from './PublicPages';

const personas = [
  { icon: GraduationCap, title: 'Alunos', desc: 'Notas, horário, conteúdos e finanças num só lugar.' },
  { icon: Users, title: 'Encarregados', desc: 'Acompanhe o percurso dos seus educandos com clareza.' },
  { icon: BookOpen, title: 'Professores', desc: 'Avaliação, presenças e materiais com fluxo simples.' },
  { icon: BarChart3, title: 'Pedagogia & Direcção', desc: 'Indicadores académicos e institucionais em tempo real.' },
];

const modules = [
  { title: 'Académico', desc: 'Avaliação 0–20, presenças, horários e relatórios.' },
  { title: 'Finanças', desc: 'Propinas, pagamentos, multas e tesouraria em MZN.' },
  { title: 'Comunicação', desc: 'Chat institucional, feed e notificações contextuais.' },
  { title: 'Conhecimento', desc: 'Biblioteca de materiais por disciplina e nível.' },
  { title: 'Secretaria', desc: 'Matrículas, candidaturas e documentos oficiais.' },
  { title: 'Direcção', desc: 'Auditoria, conformidade e visão estratégica.' },
];

const stats = [
  { v: '7', l: 'Perfis integrados' },
  { v: '12', l: 'Módulos institucionais' },
  { v: '0–20', l: 'Avaliação MEC' },
  { v: 'MZN', l: 'Tesouraria local' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-8">
          <Brand to="/" size="md" />
          <nav className="hidden md:flex items-center gap-1">
            <Link to="/features" className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">Funcionalidades</Link>
            <Link to="/contact" className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">Contacto</Link>
            <Link to="/apply" className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">Candidatura</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login" className="rounded-xl px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted transition-colors">Entrar</Link>
            <Link to="/apply" className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary-deep transition-colors">
              Começar <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-60" style={{ background: 'radial-gradient(ellipse at top, hsl(var(--primary-soft)) 0%, transparent 60%)' }} />
        <div className="mx-auto max-w-6xl px-5 pt-16 pb-20 md:px-8 md:pt-24 md:pb-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr,0.9fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary-soft/60 px-3 py-1 text-xs font-medium text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Plataforma oficial do Colégio Belo Horizonte
              </div>
              <h1 className="mt-5 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-6xl">
                Educação que se gere
                <br />
                <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">com excelência.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                O <strong className="text-foreground">Portal do Colégio Belo Horizonte</strong> conecta alunos, famílias, professores e administração numa experiência institucional moderna, segura e desenhada para Moçambique.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link to="/login" className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md hover:bg-primary-deep transition-all">
                  Aceder à plataforma <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/features" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors">
                  Ver funcionalidades
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
                {['Conforme ao sistema MEC', 'Seguro e auditado', 'Suporte local'].map(t => (
                  <span key={t} className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" />{t}</span>
                ))}
              </div>
            </div>

            {/* Decorative product card */}
            <div className="relative">
              <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-primary/10 via-transparent to-accent/20 blur-2xl" />
              <div className="relative rounded-2xl border border-border bg-card p-5 shadow-xl">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <Brand size="sm" subtitle="Painel do aluno" />
                  <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-semibold text-primary">2026 · 1º Trim.</span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    { l: 'Média', v: '17.4' },
                    { l: 'Presenças', v: '96%' },
                    { l: 'Saldo', v: '0 MT' },
                  ].map(k => (
                    <div key={k.l} className="rounded-xl bg-muted/60 p-3">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{k.l}</p>
                      <p className="mt-1 font-heading text-lg font-bold text-foreground">{k.v}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-y-2">
                  {['Português · 18', 'Matemática · 17', 'Inglês · 19'].map((d, i) => (
                    <div key={d} className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-xs">
                      <span className="text-foreground">{d.split('·')[0]}</span>
                      <span className="font-semibold text-primary">{d.split('·')[1]}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-xl bg-gradient-to-r from-primary to-primary-deep p-4 text-primary-foreground">
                  <p className="text-[11px] uppercase tracking-wider opacity-80">Próximo evento</p>
                  <p className="mt-1 text-sm font-semibold">Reunião de pais · 15 Mai</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-4">
            {stats.map(s => (
              <div key={s.l} className="rounded-2xl border border-border bg-card/50 px-5 py-4 text-center">
                <p className="font-heading text-2xl font-bold text-primary">{s.v}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personas */}
      <section className="border-t border-border/60 bg-secondary/40 px-5 py-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Para toda a comunidade</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground md:text-4xl">Uma plataforma. Cada perfil no seu lugar.</h2>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">Experiências dedicadas, dados partilhados, decisões coordenadas.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {personas.map(p => (
              <div key={p.title} className="group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-heading text-base font-bold text-foreground">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="px-5 py-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr,1.1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Ecossistema completo</p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-foreground md:text-4xl">Tudo o que uma escola moderna precisa.</h2>
              <p className="mt-3 text-sm text-muted-foreground md:text-base">Módulos integrados que falam entre si — do lançamento de notas à reconciliação financeira.</p>
              <Link to="/features" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2 transition-all">
                Explorar módulos <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {modules.map(m => (
                <div key={m.title} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <h3 className="font-heading text-sm font-bold text-foreground">{m.title}</h3>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-primary via-primary-deep to-primary p-8 text-center text-primary-foreground shadow-xl md:p-14">
          <ShieldCheck className="mx-auto h-10 w-10 text-accent" />
          <h2 className="mt-4 font-heading text-3xl font-bold md:text-4xl">Pronto para elevar a sua escola?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-primary-foreground/80 md:text-base">O Colégio Belo Horizonte adopta uma plataforma moderna para acompanhar cada aluno com excelência.</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link to="/apply" className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-accent-foreground shadow-md hover:brightness-105 transition-all">
              Iniciar candidatura <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl border border-primary-foreground/20 px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10 transition-colors">
              Falar connosco
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
