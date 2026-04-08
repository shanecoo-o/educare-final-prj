export type UserRole =
  | 'student'
  | 'guardian'
  | 'teacher'
  | 'pedagogy'
  | 'executive'
  | 'secretary'
  | 'finance';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  institution?: string;
}

export const ROLE_LABELS: Record<UserRole, string> = {
  student: 'Student',
  guardian: 'Guardian',
  teacher: 'Teacher',
  pedagogy: 'Academic Coordination',
  executive: 'Administration',
  secretary: 'Secretary',
  finance: 'Finance & Treasury',
};

export const ROLE_HOME: Record<UserRole, string> = {
  student: '/app/student/dashboard',
  guardian: '/app/guardian/dashboard',
  teacher: '/app/teacher/dashboard',
  pedagogy: '/app/pedagogy/dashboard',
  executive: '/app/executive/dashboard',
  secretary: '/app/secretary/dashboard',
  finance: '/app/finance/dashboard',
};
