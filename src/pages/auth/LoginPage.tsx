import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import type { UserRole } from '@/types/roles';
import { ROLE_LABELS, ROLE_HOME } from '@/types/roles';
import { cn } from '@/lib/utils';

const DEMO_ROLES: { role: UserRole; label: string; description: string; icon: string }[] = [
  { role: 'student', label: 'Student', description: 'View grades, schedule & fees', icon: '🎓' },
  { role: 'guardian', label: 'Guardian', description: 'Monitor your children', icon: '👨‍👩‍👧' },
  { role: 'teacher', label: 'Teacher', description: 'Classes, grading & materials', icon: '📚' },
  { role: 'pedagogy', label: 'Pedagogy', description: 'Academic coordination', icon: '📊' },
  { role: 'executive', label: 'Executive', description: 'Administration overview', icon: '🏛️' },
  { role: 'secretary', label: 'Secretary', description: 'Enrollment & documents', icon: '📋' },
  { role: 'finance', label: 'Finance', description: 'Treasury & payments', icon: '💰' },
];

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const { login, isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated && role) {
    navigate(ROLE_HOME[role], { replace: true });
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email || `demo@school.edu`, password, selectedRole);
    navigate(ROLE_HOME[selectedRole], { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="font-heading text-xl font-bold text-foreground">Sign in to EDUOS</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">Select a role to explore the platform</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Role selector pills */}
          <div>
            <label className="mb-2 block text-xs font-medium text-foreground">Sign in as</label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {DEMO_ROLES.map(({ role: r, label, description, icon }) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setSelectedRole(r)}
                  className={cn(
                    'flex flex-col items-start gap-1 rounded-xl border p-3 text-left transition-all active:scale-[0.97]',
                    selectedRole === r
                      ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                      : 'border-border bg-card hover:border-primary/20 hover:bg-muted/50'
                  )}
                >
                  <span className="text-lg">{icon}</span>
                  <span className={cn('text-xs font-semibold', selectedRole === r ? 'text-primary' : 'text-foreground')}>{label}</span>
                  <span className="text-[10px] text-muted-foreground leading-tight">{description}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@institution.edu"
              className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
              <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-muted-foreground">
              <input type="checkbox" className="rounded border-input" />
              Remember me
            </label>
            <Link to="/forgot-password" className="font-medium text-primary hover:underline">Forgot password?</Link>
          </div>
          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors active:scale-[0.98]"
          >
            Sign in as {ROLE_LABELS[selectedRole]}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Don't have an account?{' '}
          <Link to="/apply" className="font-medium text-primary hover:underline">Apply here</Link>
        </p>
      </div>
    </div>
  );
}
