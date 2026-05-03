import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import type { UserRole } from '@/types/roles';
import { ROLE_HOME } from '@/types/roles';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const DEMO_ROLES: { role: UserRole; label: string; description: string; icon: string }[] = [
  { role: 'student', label: 'Aluno', description: 'Notas, horário e finanças', icon: '🎓' },
  { role: 'guardian', label: 'Encarregado', description: 'Acompanhar os educandos', icon: '👨‍👩‍👧' },
  { role: 'teacher', label: 'Professor', description: 'Turmas, avaliações e conteúdos', icon: '📚' },
  { role: 'pedagogy', label: 'Pedagogia', description: 'Coordenação académica', icon: '📊' },
  { role: 'executive', label: 'Direcção', description: 'Visão institucional', icon: '🏛️' },
  { role: 'secretary', label: 'Secretaria', description: 'Matrículas e documentos', icon: '📋' },
  { role: 'finance', label: 'Finanças', description: 'Tesouraria e pagamentos', icon: '💰' },
];

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const { login, isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated && role) {
    navigate(ROLE_HOME[role], { replace: true });
    return null;
  }

  const current = DEMO_ROLES.find(r => r.role === selectedRole)!;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password, selectedRole, remember);
    navigate(ROLE_HOME[selectedRole], { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-6">
      <div className="w-full max-w-sm animate-fade-in">
        <div className="mb-5 text-center">
          <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="font-heading text-xl font-bold text-foreground">Entrar no EDUCORE</h1>
          <p className="mt-1 text-xs text-muted-foreground">Aceda à sua conta institucional</p>
        </div>

        <form className="space-y-3.5" onSubmit={handleSubmit}>
          {/* Profile combobox */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">Perfil</label>
            <Select value={selectedRole} onValueChange={(v) => setSelectedRole(v as UserRole)}>
              <SelectTrigger className="h-12 rounded-xl border-input">
                <SelectValue>
                  <div className="flex items-center gap-2.5 text-left">
                    <span className="text-lg leading-none">{current.icon}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground leading-tight">{current.label}</p>
                      <p className="text-[11px] text-muted-foreground leading-tight">{current.description}</p>
                    </div>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {DEMO_ROLES.map(r => (
                  <SelectItem key={r.role} value={r.role} className="rounded-lg">
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{r.icon}</span>
                      <div>
                        <p className="text-sm font-medium text-foreground leading-tight">{r.label}</p>
                        <p className="text-[11px] text-muted-foreground leading-tight">{r.description}</p>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-foreground">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nome@escola.mz"
              className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-foreground">Palavra-passe</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
              <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
              <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="rounded border-input" />
              Lembrar-me
            </label>
            <Link to="/forgot-password" className="font-medium text-primary hover:underline">Esqueci-me</Link>
          </div>
          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors active:scale-[0.98]"
          >
            Entrar como {current.label}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Não tem conta? <Link to="/apply" className="font-medium text-primary hover:underline">Candidatar-se</Link>
        </p>
      </div>
    </div>
  );
}
