import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { UserRole, UserProfile } from '@/types/roles';
import { ROLE_HOME } from '@/types/roles';

interface AuthState {
  user: UserProfile | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => void;
  logout: () => void;
  getRedirectPath: () => string;
}

const AuthContext = createContext<AuthState | null>(null);

/* Mock users per role for demo */
const MOCK_USERS: Record<UserRole, UserProfile> = {
  student: { id: '1', name: 'John Smith', email: 'john@school.edu', role: 'student', institution: 'EDUOS Academy' },
  guardian: { id: '2', name: 'Mary Smith', email: 'mary@email.com', role: 'guardian', institution: 'EDUOS Academy' },
  teacher: { id: '3', name: 'Dr. Sarah Williams', email: 'sarah@school.edu', role: 'teacher', institution: 'EDUOS Academy' },
  pedagogy: { id: '4', name: 'Prof. Ana Costa', email: 'ana@school.edu', role: 'pedagogy', institution: 'EDUOS Academy' },
  executive: { id: '5', name: 'Director James Lee', email: 'james@school.edu', role: 'executive', institution: 'EDUOS Academy' },
  secretary: { id: '6', name: 'Laura Santos', email: 'laura@school.edu', role: 'secretary', institution: 'EDUOS Academy' },
  finance: { id: '7', name: 'Carlos Mendes', email: 'carlos@school.edu', role: 'finance', institution: 'EDUOS Academy' },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);

  const login = useCallback((email: string, _password: string, selectedRole: UserRole) => {
    const mockUser = { ...MOCK_USERS[selectedRole], email };
    setUser(mockUser);
    setRole(selectedRole);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setRole(null);
  }, []);

  const getRedirectPath = useCallback(() => {
    return role ? ROLE_HOME[role] : '/login';
  }, [role]);

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
