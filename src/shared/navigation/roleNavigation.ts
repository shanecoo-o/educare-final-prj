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
} from 'lucide-react';
import type { NavItem } from '@/types/navigation';
import type { UserRole } from '@/types/roles';

/* ─── Per-role main navigation ─── */

const studentNav: NavItem[] = [
  { label: 'Home', path: '/app', icon: LayoutDashboard },
  { label: 'Academic', path: '/app/academic', icon: GraduationCap },
  { label: 'Finance', path: '/app/finance', icon: Wallet },
  { label: 'Knowledge', path: '/app/knowledge', icon: BookOpen },
  { label: 'Chat', path: '/app/chat', icon: MessageCircle },
  { label: 'Feed', path: '/app/feed', icon: Newspaper },
  { label: 'Notifications', path: '/app/notifications', icon: Bell },
];

const guardianNav: NavItem[] = [
  { label: 'Home', path: '/app', icon: LayoutDashboard },
  { label: 'Academic', path: '/app/academic', icon: GraduationCap },
  { label: 'Finance', path: '/app/finance', icon: Wallet },
  { label: 'Chat', path: '/app/chat', icon: MessageCircle },
  { label: 'Notifications', path: '/app/notifications', icon: Bell },
];

const teacherNav: NavItem[] = [
  { label: 'Home', path: '/app', icon: LayoutDashboard },
  { label: 'Academic', path: '/app/academic', icon: GraduationCap },
  { label: 'Knowledge', path: '/app/knowledge', icon: BookOpen },
  { label: 'Chat', path: '/app/chat', icon: MessageCircle },
  { label: 'Feed', path: '/app/feed', icon: Newspaper },
  { label: 'Notifications', path: '/app/notifications', icon: Bell },
];

const financeNav: NavItem[] = [
  { label: 'Home', path: '/app', icon: LayoutDashboard },
  { label: 'Finance', path: '/app/finance', icon: Wallet },
  { label: 'Validation', path: '/app/admin', icon: CheckCircle },
  { label: 'Reports', path: '/app/admin', icon: FileText },
  { label: 'Notifications', path: '/app/notifications', icon: Bell },
];

const executiveNav: NavItem[] = [
  { label: 'Home', path: '/app', icon: LayoutDashboard },
  { label: 'Academic', path: '/app/academic', icon: GraduationCap },
  { label: 'Finance', path: '/app/finance', icon: Wallet },
  { label: 'Knowledge', path: '/app/knowledge', icon: BookOpen },
  { label: 'Feed', path: '/app/feed', icon: Newspaper },
  { label: 'Chat', path: '/app/chat', icon: MessageCircle },
  { label: 'Notifications', path: '/app/notifications', icon: Bell },
];

const secretaryNav: NavItem[] = [
  { label: 'Home', path: '/app', icon: LayoutDashboard },
  { label: 'Academic', path: '/app/academic', icon: GraduationCap },
  { label: 'Finance', path: '/app/finance', icon: Wallet },
  { label: 'Chat', path: '/app/chat', icon: MessageCircle },
  { label: 'Notifications', path: '/app/notifications', icon: Bell },
];

const pedagogyNav: NavItem[] = [
  { label: 'Home', path: '/app', icon: LayoutDashboard },
  { label: 'Academic', path: '/app/academic', icon: GraduationCap },
  { label: 'Knowledge', path: '/app/knowledge', icon: BookOpen },
  { label: 'Feed', path: '/app/feed', icon: Newspaper },
  { label: 'Chat', path: '/app/chat', icon: MessageCircle },
  { label: 'Notifications', path: '/app/notifications', icon: Bell },
];

/* ─── Role → Navigation map ─── */

export const ROLE_NAVIGATION: Record<UserRole, NavItem[]> = {
  student: studentNav,
  guardian: guardianNav,
  teacher: teacherNav,
  finance: financeNav,
  school_admin: executiveNav,
  super_admin: executiveNav,
  secretary: secretaryNav,
  academic_coordinator: pedagogyNav,
};

/* ─── Bottom nav per role (mobile) ─── */

const studentBottomNav: NavItem[] = [
  { label: 'Home', path: '/app', icon: LayoutDashboard },
  { label: 'Academic', path: '/app/academic', icon: GraduationCap },
  { label: 'Finance', path: '/app/finance', icon: Wallet },
  { label: 'Chat', path: '/app/chat', icon: MessageCircle },
];

const guardianBottomNav: NavItem[] = [
  { label: 'Home', path: '/app', icon: LayoutDashboard },
  { label: 'Academic', path: '/app/academic', icon: GraduationCap },
  { label: 'Finance', path: '/app/finance', icon: Wallet },
  { label: 'Chat', path: '/app/chat', icon: MessageCircle },
];

const staffBottomNav: NavItem[] = [
  { label: 'Home', path: '/app', icon: LayoutDashboard },
  { label: 'Academic', path: '/app/academic', icon: GraduationCap },
  { label: 'Chat', path: '/app/chat', icon: MessageCircle },
  { label: 'Feed', path: '/app/feed', icon: Newspaper },
];

const financeBottomNav: NavItem[] = [
  { label: 'Home', path: '/app', icon: LayoutDashboard },
  { label: 'Finance', path: '/app/finance', icon: Wallet },
  { label: 'Admin', path: '/app/admin', icon: CheckCircle },
  { label: 'Alerts', path: '/app/notifications', icon: Bell },
];

export const ROLE_BOTTOM_NAV: Record<UserRole, NavItem[]> = {
  student: studentBottomNav,
  guardian: guardianBottomNav,
  teacher: staffBottomNav,
  finance: financeBottomNav,
  school_admin: staffBottomNav,
  super_admin: staffBottomNav,
  secretary: staffBottomNav,
  academic_coordinator: staffBottomNav,
};
