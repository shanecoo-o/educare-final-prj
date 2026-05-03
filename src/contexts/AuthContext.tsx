import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { UserRole, UserProfile } from '@/types/roles';
import { ROLE_HOME } from '@/types/roles';

interface AuthState {
  user: UserProfile | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole, remember?: boolean) => void;
  logout: () => void;
  getRedirectPath: () => string;
}

const AuthContext = createContext<AuthState | null>(null);
const STORAGE_KEY = 'eduos.auth';

const MOCK_USERS: Record<UserRole, UserProfile> = {
  student: { id: 'ALU-001', name: 'Amélia Mondlane', email: 'amelia@escola.mz', role: 'student', institution: 'Escola Secundária Eduardo Mondlane' },
  guardian: { id: 'ENC-001', name: 'José Mondlane', email: 'jose@familia.mz', role: 'guardian', institution: 'Escola Secundária Eduardo Mondlane' },
  teacher: { id: 'PROF-001', name: 'Prof. António Magaia', email: 'antonio@escola.mz', role: 'teacher', institution: 'Escola Secundária Eduardo Mondlane' },
  pedagogy: { id: 'PED-001', name: 'Prof.ª Ana Costa', email: 'ana@escola.mz', role: 'pedagogy', institution: 'Escola Secundária Eduardo Mondlane' },
  executive: { id: 'DIR-001', name: 'Dr. Manuel Sitoe', email: 'manuel@escola.mz', role: 'executive', institution: 'Escola Secundária Eduardo Mondlane' },
  secretary: { id: 'SEC-001', name: 'Laura Tembe', email: 'laura@escola.mz', role: 'secretary', institution: 'Escola Secundária Eduardo Mondlane' },
  finance: { id: 'FIN-001', name: 'Carlos Mendes', email: 'carlos@escola.mz', role: 'finance', institution: 'Escola Secundária Eduardo Mondlane' },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.user && parsed.role) {
          setUser(parsed.user);
          setRole(parsed.role);
        }
      }
    } catch {/* noop */}
  }, []);

  const login = useCallback((email: string, _password: string, selectedRole: UserRole, remember = false) => {
    const mockUser = { ...MOCK_USERS[selectedRole], email: email || MOCK_USERS[selectedRole].email };
    setUser(mockUser);
    setRole(selectedRole);
    if (remember) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: mockUser, role: selectedRole })); } catch {/* noop */}
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setRole(null);
    try { localStorage.removeItem(STORAGE_KEY); } catch {/* noop */}
  }, []);

  const getRedirectPath = useCallback(() => (role ? ROLE_HOME[role] : '/login'), [role]);

  return (
    <AuthContext.Provider value={{ user, role, isAuthenticated: !!user, login, logout, getRedirectPath }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
