export type UserRole =
  | 'super_admin'
  | 'school_admin'
  | 'secretary'
  | 'finance'
  | 'academic_coordinator'
  | 'teacher'
  | 'guardian'
  | 'student';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  institution?: string;
}

export const ROLE_LABELS: Record<UserRole, string> = {
  super_admin: 'Super Admin',
  school_admin: 'Administration',
  secretary: 'Secretary',
  finance: 'Finance & Treasury',
  academic_coordinator: 'Academic Coordination',
  teacher: 'Teacher',
  guardian: 'Guardian',
  student: 'Student',
};
