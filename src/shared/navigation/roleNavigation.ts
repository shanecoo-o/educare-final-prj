import {
  LayoutDashboard,
  GraduationCap,
  Wallet,
  BookOpen,
  MessageCircle,
  Newspaper,
  Bell,
  Settings,
  Users,
  ClipboardList,
  Calendar,
  CheckCircle,
  FileText,
  BarChart3,
  AlertTriangle,
  FolderOpen,
  UserCheck,
  Shield,
  Receipt,
  Banknote,
} from 'lucide-react';
import type { NavItem } from '@/types/navigation';
import type { UserRole } from '@/types/roles';

/* ─── Student ─── */
const studentNav: NavItem[] = [
  { label: 'Dashboard', path: '/app/student/dashboard', icon: LayoutDashboard },
  { label: 'Grades', path: '/app/student/grades', icon: ClipboardList },
  { label: 'Attendance', path: '/app/student/attendance', icon: CheckCircle },
  { label: 'Schedule', path: '/app/student/schedule', icon: Calendar },
  { label: 'Knowledge', path: '/app/student/knowledge', icon: BookOpen },
  { label: 'Finance', path: '/app/student/finance', icon: Wallet },
  { label: 'Chat', path: '/app/student/chat', icon: MessageCircle },
  { label: 'Feed', path: '/app/student/feed', icon: Newspaper },
  { label: 'Notifications', path: '/app/student/notifications', icon: Bell },
];

/* ─── Guardian ─── */
const guardianNav: NavItem[] = [
  { label: 'Dashboard', path: '/app/guardian/dashboard', icon: LayoutDashboard },
  { label: 'Students', path: '/app/guardian/students', icon: Users },
  { label: 'Performance', path: '/app/guardian/performance', icon: BarChart3 },
  { label: 'Attendance', path: '/app/guardian/attendance', icon: CheckCircle },
  { label: 'Schedule', path: '/app/guardian/schedule', icon: Calendar },
  { label: 'Finance', path: '/app/guardian/finance', icon: Wallet },
  { label: 'Payments', path: '/app/guardian/payments', icon: Receipt },
  { label: 'Chat', path: '/app/guardian/chat', icon: MessageCircle },
  { label: 'Notifications', path: '/app/guardian/notifications', icon: Bell },
];

/* ─── Teacher ─── */
const teacherNav: NavItem[] = [
  { label: 'Dashboard', path: '/app/teacher/dashboard', icon: LayoutDashboard },
  { label: 'Schedule', path: '/app/teacher/schedule', icon: Calendar },
  { label: 'Classes', path: '/app/teacher/classes', icon: Users },
  { label: 'Attendance', path: '/app/teacher/attendance', icon: CheckCircle },
  { label: 'Assessments', path: '/app/teacher/assessments', icon: ClipboardList },
  { label: 'Gradebook', path: '/app/teacher/gradebook', icon: BookOpen },
  { label: 'Knowledge', path: '/app/teacher/knowledge', icon: FolderOpen },
  { label: 'Chat', path: '/app/teacher/chat', icon: MessageCircle },
  { label: 'Notifications', path: '/app/teacher/notifications', icon: Bell },
];

/* ─── Pedagogy ─── */
const pedagogyNav: NavItem[] = [
  { label: 'Dashboard', path: '/app/pedagogy/dashboard', icon: LayoutDashboard },
  { label: 'Analytics', path: '/app/pedagogy/analytics', icon: BarChart3 },
  { label: 'Classes', path: '/app/pedagogy/classes', icon: Users },
  { label: 'Teachers', path: '/app/pedagogy/teachers', icon: UserCheck },
  { label: 'Attendance', path: '/app/pedagogy/attendance', icon: CheckCircle },
  { label: 'Schedule', path: '/app/pedagogy/schedule', icon: Calendar },
  { label: 'Risk', path: '/app/pedagogy/risk', icon: AlertTriangle },
  { label: 'Reports', path: '/app/pedagogy/reports', icon: FileText },
];

/* ─── Executive ─── */
const executiveNav: NavItem[] = [
  { label: 'Dashboard', path: '/app/executive/dashboard', icon: LayoutDashboard },
  { label: 'Finance', path: '/app/executive/finance', icon: Wallet },
  { label: 'Academic', path: '/app/executive/academic', icon: GraduationCap },
  { label: 'Enrollment', path: '/app/executive/enrollment', icon: Users },
  { label: 'Reports', path: '/app/executive/reports', icon: FileText },
  { label: 'Audit', path: '/app/executive/audit', icon: Shield },
];

/* ─── Secretary ─── */
const secretaryNav: NavItem[] = [
  { label: 'Dashboard', path: '/app/secretary/dashboard', icon: LayoutDashboard },
  { label: 'Admissions', path: '/app/secretary/admissions', icon: UserCheck },
  { label: 'Enrollments', path: '/app/secretary/enrollments', icon: ClipboardList },
  { label: 'Students', path: '/app/secretary/students', icon: Users },
  { label: 'Documents', path: '/app/secretary/documents', icon: FolderOpen },
  { label: 'Classes', path: '/app/secretary/classes', icon: BookOpen },
  { label: 'Schedule', path: '/app/secretary/schedule', icon: Calendar },
];

/* ─── Finance ─── */
const financeNav: NavItem[] = [
  { label: 'Dashboard', path: '/app/finance/dashboard', icon: LayoutDashboard },
  { label: 'Payments', path: '/app/finance/payments', icon: Wallet },
  { label: 'Validation', path: '/app/finance/validation', icon: CheckCircle },
  { label: 'Obligations', path: '/app/finance/obligations', icon: FileText },
  { label: 'Accounts', path: '/app/finance/accounts', icon: Users },
  { label: 'Receipts', path: '/app/finance/receipts', icon: Receipt },
  { label: 'Penalties', path: '/app/finance/penalties', icon: AlertTriangle },
  { label: 'Treasury', path: '/app/finance/treasury', icon: Banknote },
  { label: 'Reports', path: '/app/finance/reports', icon: BarChart3 },
];

export const ROLE_NAVIGATION: Record<UserRole, NavItem[]> = {
  student: studentNav,
  guardian: guardianNav,
  teacher: teacherNav,
  pedagogy: pedagogyNav,
  executive: executiveNav,
  secretary: secretaryNav,
  finance: financeNav,
};

/* ─── Bottom nav (mobile) ─── */
const studentBottom: NavItem[] = [
  { label: 'Home', path: '/app/student/dashboard', icon: LayoutDashboard },
  { label: 'Grades', path: '/app/student/grades', icon: ClipboardList },
  { label: 'Finance', path: '/app/student/finance', icon: Wallet },
  { label: 'Chat', path: '/app/student/chat', icon: MessageCircle },
];

const guardianBottom: NavItem[] = [
  { label: 'Home', path: '/app/guardian/dashboard', icon: LayoutDashboard },
  { label: 'Students', path: '/app/guardian/students', icon: Users },
  { label: 'Payments', path: '/app/guardian/payments', icon: Wallet },
  { label: 'Chat', path: '/app/guardian/chat', icon: MessageCircle },
];

const teacherBottom: NavItem[] = [
  { label: 'Home', path: '/app/teacher/dashboard', icon: LayoutDashboard },
  { label: 'Classes', path: '/app/teacher/classes', icon: Users },
  { label: 'Grades', path: '/app/teacher/gradebook', icon: BookOpen },
  { label: 'Chat', path: '/app/teacher/chat', icon: MessageCircle },
];

const staffBottom: NavItem[] = [
  { label: 'Home', path: '/app/pedagogy/dashboard', icon: LayoutDashboard },
  { label: 'Analytics', path: '/app/pedagogy/analytics', icon: BarChart3 },
  { label: 'Classes', path: '/app/pedagogy/classes', icon: Users },
  { label: 'Reports', path: '/app/pedagogy/reports', icon: FileText },
];

const executiveBottom: NavItem[] = [
  { label: 'Home', path: '/app/executive/dashboard', icon: LayoutDashboard },
  { label: 'Finance', path: '/app/executive/finance', icon: Wallet },
  { label: 'Reports', path: '/app/executive/reports', icon: FileText },
  { label: 'Audit', path: '/app/executive/audit', icon: Shield },
];

const secretaryBottom: NavItem[] = [
  { label: 'Home', path: '/app/secretary/dashboard', icon: LayoutDashboard },
  { label: 'Students', path: '/app/secretary/students', icon: Users },
  { label: 'Admissions', path: '/app/secretary/admissions', icon: UserCheck },
  { label: 'Documents', path: '/app/secretary/documents', icon: FolderOpen },
];

const financeBottom: NavItem[] = [
  { label: 'Home', path: '/app/finance/dashboard', icon: LayoutDashboard },
  { label: 'Payments', path: '/app/finance/payments', icon: Wallet },
  { label: 'Validation', path: '/app/finance/validation', icon: CheckCircle },
  { label: 'Reports', path: '/app/finance/reports', icon: BarChart3 },
];

export const ROLE_BOTTOM_NAV: Record<UserRole, NavItem[]> = {
  student: studentBottom,
  guardian: guardianBottom,
  teacher: teacherBottom,
  pedagogy: staffBottom,
  executive: executiveBottom,
  secretary: secretaryBottom,
  finance: financeBottom,
};
