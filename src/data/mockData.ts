/* ─── EDUOS Centralized Mock Data ─── */

export interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  section: string;
  avatar: string;
  gpa: number;
  attendanceRate: number;
  status: 'active' | 'at_risk' | 'excellent';
}

export interface Guardian {
  id: string;
  name: string;
  email: string;
  phone: string;
  students: string[]; // student ids
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  department: string;
  subjects: string[];
  classCount: number;
  studentCount: number;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  teacherId: string;
  teacherName: string;
  credits: number;
}

export interface ClassGroup {
  id: string;
  name: string;
  grade: string;
  section: string;
  studentCount: number;
  advisor: string;
}

export interface GradeEntry {
  id: string;
  studentId: string;
  subjectId: string;
  subjectName: string;
  evaluation: string;
  score: number;
  maxScore: number;
  weight: number;
  date: string;
  type: 'exam' | 'quiz' | 'lab' | 'project' | 'homework';
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  subject?: string;
  note?: string;
}

export interface ScheduleSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  time: string;
  endTime: string;
  subject: string;
  teacher: string;
  room: string;
  classGroup: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  concept: string;
  amount: number;
  paidAmount: number;
  dueDate: string;
  paidDate?: string;
  status: 'pending' | 'paid' | 'overdue' | 'partial' | 'under_review' | 'validated' | 'rejected';
  method?: string;
  reference?: string;
}

export interface Obligation {
  id: string;
  concept: string;
  amount: number;
  dueDate: string;
  category: 'tuition' | 'lab' | 'activity' | 'material' | 'registration';
  studentId: string;
  studentName: string;
  status: 'active' | 'paid' | 'overdue';
}

export interface FinanceAccount {
  id: string;
  studentId: string;
  studentName: string;
  totalDue: number;
  totalPaid: number;
  balance: number;
  lastPayment?: string;
  status: 'current' | 'delinquent' | 'paid_up';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'grade' | 'attendance' | 'payment' | 'announcement' | 'alert' | 'message';
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface FeedItem {
  id: string;
  author: string;
  authorRole: string;
  title: string;
  content: string;
  timestamp: string;
  category: 'announcement' | 'academic' | 'event' | 'general';
  pinned?: boolean;
}

export interface KnowledgeItem {
  id: string;
  title: string;
  description: string;
  subject: string;
  type: 'document' | 'video' | 'quiz' | 'presentation' | 'link';
  author: string;
  date: string;
  size?: string;
}

export interface Assessment {
  id: string;
  title: string;
  subject: string;
  classGroup: string;
  type: 'exam' | 'quiz' | 'lab' | 'project';
  date: string;
  weight: number;
  status: 'draft' | 'published' | 'graded' | 'upcoming';
  totalStudents: number;
  gradedCount: number;
}

/* ═══════════════════════════════════════════ */
/*               DATA INSTANCES                */
/* ═══════════════════════════════════════════ */

export const students: Student[] = [
  { id: 'STU-001', name: 'John Smith', email: 'john.smith@school.edu', grade: '11', section: 'B', avatar: 'JS', gpa: 3.6, attendanceRate: 87, status: 'active' },
  { id: 'STU-002', name: 'Emily Davis', email: 'emily.davis@school.edu', grade: '11', section: 'A', avatar: 'ED', gpa: 2.4, attendanceRate: 78, status: 'at_risk' },
  { id: 'STU-003', name: 'Michael Brown', email: 'michael.b@school.edu', grade: '12', section: 'A', avatar: 'MB', gpa: 1.9, attendanceRate: 65, status: 'at_risk' },
  { id: 'STU-004', name: 'Sarah Johnson', email: 'sarah.j@school.edu', grade: '10', section: 'A', avatar: 'SJ', gpa: 3.9, attendanceRate: 96, status: 'excellent' },
  { id: 'STU-005', name: 'Tom Wilson', email: 'tom.w@school.edu', grade: '11', section: 'B', avatar: 'TW', gpa: 3.1, attendanceRate: 82, status: 'active' },
  { id: 'STU-006', name: 'Anna Lee', email: 'anna.lee@school.edu', grade: '10', section: 'B', avatar: 'AL', gpa: 2.7, attendanceRate: 74, status: 'at_risk' },
  { id: 'STU-007', name: 'Lucas Martin', email: 'lucas.m@school.edu', grade: '12', section: 'B', avatar: 'LM', gpa: 3.4, attendanceRate: 91, status: 'active' },
  { id: 'STU-008', name: 'Sofia Rodriguez', email: 'sofia.r@school.edu', grade: '11', section: 'A', avatar: 'SR', gpa: 3.8, attendanceRate: 94, status: 'excellent' },
];

export const guardians: Guardian[] = [
  { id: 'GRD-001', name: 'Robert Smith', email: 'robert.smith@email.com', phone: '+1 555-0101', students: ['STU-001'] },
  { id: 'GRD-002', name: 'Maria Davis', email: 'maria.davis@email.com', phone: '+1 555-0102', students: ['STU-002'] },
  { id: 'GRD-003', name: 'James Johnson', email: 'james.j@email.com', phone: '+1 555-0103', students: ['STU-004'] },
];

export const teachers: Teacher[] = [
  { id: 'TCH-001', name: 'Dr. Alan Smith', email: 'a.smith@school.edu', department: 'Mathematics', subjects: ['Mathematics I', 'Mathematics II', 'Statistics'], classCount: 4, studentCount: 128 },
  { id: 'TCH-002', name: 'Prof. Elena Garcia', email: 'e.garcia@school.edu', department: 'Sciences', subjects: ['Physics', 'Applied Physics'], classCount: 3, studentCount: 96 },
  { id: 'TCH-003', name: 'Dr. James Chen', email: 'j.chen@school.edu', department: 'Sciences', subjects: ['Chemistry', 'Organic Chemistry'], classCount: 3, studentCount: 88 },
  { id: 'TCH-004', name: 'Prof. Laura Williams', email: 'l.williams@school.edu', department: 'Languages', subjects: ['English Literature', 'Creative Writing'], classCount: 4, studentCount: 120 },
  { id: 'TCH-005', name: 'Dr. David Park', email: 'd.park@school.edu', department: 'Biology', subjects: ['Biology', 'Ecology'], classCount: 3, studentCount: 94 },
];

export const subjects: Subject[] = [
  { id: 'SUB-001', name: 'Mathematics II', code: 'MATH201', teacherId: 'TCH-001', teacherName: 'Dr. Alan Smith', credits: 4 },
  { id: 'SUB-002', name: 'Physics', code: 'PHY101', teacherId: 'TCH-002', teacherName: 'Prof. Elena Garcia', credits: 4 },
  { id: 'SUB-003', name: 'Chemistry', code: 'CHEM101', teacherId: 'TCH-003', teacherName: 'Dr. James Chen', credits: 3 },
  { id: 'SUB-004', name: 'English Literature', code: 'ENG201', teacherId: 'TCH-004', teacherName: 'Prof. Laura Williams', credits: 3 },
  { id: 'SUB-005', name: 'Biology', code: 'BIO101', teacherId: 'TCH-005', teacherName: 'Dr. David Park', credits: 3 },
  { id: 'SUB-006', name: 'Statistics', code: 'MATH301', teacherId: 'TCH-001', teacherName: 'Dr. Alan Smith', credits: 3 },
];

export const classGroups: ClassGroup[] = [
  { id: 'CLS-001', name: 'Grade 10A', grade: '10', section: 'A', studentCount: 32, advisor: 'Prof. Laura Williams' },
  { id: 'CLS-002', name: 'Grade 10B', grade: '10', section: 'B', studentCount: 30, advisor: 'Dr. David Park' },
  { id: 'CLS-003', name: 'Grade 11A', grade: '11', section: 'A', studentCount: 28, advisor: 'Prof. Elena Garcia' },
  { id: 'CLS-004', name: 'Grade 11B', grade: '11', section: 'B', studentCount: 31, advisor: 'Dr. Alan Smith' },
  { id: 'CLS-005', name: 'Grade 12A', grade: '12', section: 'A', studentCount: 26, advisor: 'Dr. James Chen' },
  { id: 'CLS-006', name: 'Grade 12B', grade: '12', section: 'B', studentCount: 29, advisor: 'Dr. Alan Smith' },
];

export const grades: GradeEntry[] = [
  { id: 'GRD-E01', studentId: 'STU-001', subjectId: 'SUB-001', subjectName: 'Mathematics II', evaluation: 'Midterm Exam', score: 18, maxScore: 20, weight: 40, date: '2026-03-15', type: 'exam' },
  { id: 'GRD-E02', studentId: 'STU-001', subjectId: 'SUB-002', subjectName: 'Physics', evaluation: 'Lab Report #4', score: 15, maxScore: 20, weight: 15, date: '2026-03-20', type: 'lab' },
  { id: 'GRD-E03', studentId: 'STU-001', subjectId: 'SUB-003', subjectName: 'Chemistry', evaluation: 'Practical Exam', score: 17, maxScore: 20, weight: 25, date: '2026-03-22', type: 'lab' },
  { id: 'GRD-E04', studentId: 'STU-001', subjectId: 'SUB-004', subjectName: 'English Literature', evaluation: 'Essay #2', score: 16, maxScore: 20, weight: 20, date: '2026-03-18', type: 'project' },
  { id: 'GRD-E05', studentId: 'STU-001', subjectId: 'SUB-005', subjectName: 'Biology', evaluation: 'Quiz #3', score: 9, maxScore: 20, weight: 10, date: '2026-03-25', type: 'quiz' },
  { id: 'GRD-E06', studentId: 'STU-001', subjectId: 'SUB-006', subjectName: 'Statistics', evaluation: 'Homework #5', score: 19, maxScore: 20, weight: 5, date: '2026-03-28', type: 'homework' },
  { id: 'GRD-E07', studentId: 'STU-002', subjectId: 'SUB-001', subjectName: 'Mathematics II', evaluation: 'Midterm Exam', score: 11, maxScore: 20, weight: 40, date: '2026-03-15', type: 'exam' },
  { id: 'GRD-E08', studentId: 'STU-002', subjectId: 'SUB-002', subjectName: 'Physics', evaluation: 'Lab Report #4', score: 9, maxScore: 20, weight: 15, date: '2026-03-20', type: 'lab' },
  { id: 'GRD-E09', studentId: 'STU-003', subjectId: 'SUB-006', subjectName: 'Statistics', evaluation: 'Midterm Exam', score: 8, maxScore: 20, weight: 40, date: '2026-03-15', type: 'exam' },
  { id: 'GRD-E10', studentId: 'STU-004', subjectId: 'SUB-001', subjectName: 'Mathematics II', evaluation: 'Midterm Exam', score: 19, maxScore: 20, weight: 40, date: '2026-03-15', type: 'exam' },
];

export const attendanceRecords: AttendanceRecord[] = [
  { id: 'ATT-001', studentId: 'STU-001', date: '2026-04-07', status: 'present', subject: 'Mathematics II' },
  { id: 'ATT-002', studentId: 'STU-001', date: '2026-04-07', status: 'present', subject: 'Physics' },
  { id: 'ATT-003', studentId: 'STU-001', date: '2026-04-06', status: 'late', subject: 'Chemistry', note: 'Arrived 10 min late' },
  { id: 'ATT-004', studentId: 'STU-001', date: '2026-04-04', status: 'absent', subject: 'Biology', note: 'Medical appointment' },
  { id: 'ATT-005', studentId: 'STU-001', date: '2026-04-03', status: 'present', subject: 'English Literature' },
  { id: 'ATT-006', studentId: 'STU-001', date: '2026-04-02', status: 'present', subject: 'Statistics' },
  { id: 'ATT-007', studentId: 'STU-001', date: '2026-04-01', status: 'excused', subject: 'Mathematics II', note: 'School event' },
  { id: 'ATT-008', studentId: 'STU-002', date: '2026-04-07', status: 'absent', subject: 'Mathematics II' },
  { id: 'ATT-009', studentId: 'STU-002', date: '2026-04-06', status: 'absent', subject: 'Physics' },
  { id: 'ATT-010', studentId: 'STU-003', date: '2026-04-07', status: 'late', subject: 'Statistics' },
];

const today = new Date();
const dayOfWeek = today.getDay(); // 0=Sun ... 4=Thu

function getSlotStatus(dayIndex: number, hour: number): 'upcoming' | 'ongoing' | 'completed' {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const slotDayIdx = dayIndex;
  const currentDayIdx = dayOfWeek - 1; // Mon=0
  if (slotDayIdx < currentDayIdx) return 'completed';
  if (slotDayIdx > currentDayIdx) return 'upcoming';
  const currentHour = today.getHours();
  if (hour + 1 <= currentHour) return 'completed';
  if (hour <= currentHour && currentHour < hour + 1) return 'ongoing';
  return 'upcoming';
}

export const weeklySchedule: ScheduleSlot[] = [
  // Monday
  { id: 'SCH-001', day: 'Monday', time: '08:00', endTime: '09:30', subject: 'Mathematics II', teacher: 'Dr. Alan Smith', room: 'Room 201', classGroup: 'Grade 11B', status: getSlotStatus(0, 8) },
  { id: 'SCH-002', day: 'Monday', time: '09:45', endTime: '11:15', subject: 'Physics', teacher: 'Prof. Elena Garcia', room: 'Lab 102', classGroup: 'Grade 11B', status: getSlotStatus(0, 10) },
  { id: 'SCH-003', day: 'Monday', time: '11:30', endTime: '13:00', subject: 'English Literature', teacher: 'Prof. Laura Williams', room: 'Room 305', classGroup: 'Grade 11B', status: getSlotStatus(0, 12) },
  { id: 'SCH-004', day: 'Monday', time: '14:00', endTime: '15:30', subject: 'Biology', teacher: 'Dr. David Park', room: 'Lab 201', classGroup: 'Grade 11B', status: getSlotStatus(0, 14) },
  // Tuesday
  { id: 'SCH-005', day: 'Tuesday', time: '08:00', endTime: '09:30', subject: 'Chemistry', teacher: 'Dr. James Chen', room: 'Lab 103', classGroup: 'Grade 11B', status: getSlotStatus(1, 8) },
  { id: 'SCH-006', day: 'Tuesday', time: '09:45', endTime: '11:15', subject: 'Statistics', teacher: 'Dr. Alan Smith', room: 'Room 105', classGroup: 'Grade 11B', status: getSlotStatus(1, 10) },
  { id: 'SCH-007', day: 'Tuesday', time: '11:30', endTime: '13:00', subject: 'Mathematics II', teacher: 'Dr. Alan Smith', room: 'Room 201', classGroup: 'Grade 11B', status: getSlotStatus(1, 12) },
  // Wednesday
  { id: 'SCH-008', day: 'Wednesday', time: '08:00', endTime: '09:30', subject: 'Physics', teacher: 'Prof. Elena Garcia', room: 'Room 204', classGroup: 'Grade 11B', status: getSlotStatus(2, 8) },
  { id: 'SCH-009', day: 'Wednesday', time: '09:45', endTime: '11:15', subject: 'Biology', teacher: 'Dr. David Park', room: 'Lab 201', classGroup: 'Grade 11B', status: getSlotStatus(2, 10) },
  { id: 'SCH-010', day: 'Wednesday', time: '11:30', endTime: '13:00', subject: 'English Literature', teacher: 'Prof. Laura Williams', room: 'Room 305', classGroup: 'Grade 11B', status: getSlotStatus(2, 12) },
  { id: 'SCH-011', day: 'Wednesday', time: '14:00', endTime: '15:30', subject: 'Chemistry', teacher: 'Dr. James Chen', room: 'Lab 103', classGroup: 'Grade 11B', status: getSlotStatus(2, 14) },
  // Thursday
  { id: 'SCH-012', day: 'Thursday', time: '08:00', endTime: '09:30', subject: 'Mathematics II', teacher: 'Dr. Alan Smith', room: 'Room 201', classGroup: 'Grade 11B', status: getSlotStatus(3, 8) },
  { id: 'SCH-013', day: 'Thursday', time: '09:45', endTime: '11:15', subject: 'Statistics', teacher: 'Dr. Alan Smith', room: 'Room 105', classGroup: 'Grade 11B', status: getSlotStatus(3, 10) },
  { id: 'SCH-014', day: 'Thursday', time: '11:30', endTime: '13:00', subject: 'Physics', teacher: 'Prof. Elena Garcia', room: 'Lab 102', classGroup: 'Grade 11B', status: getSlotStatus(3, 12) },
  // Friday
  { id: 'SCH-015', day: 'Friday', time: '08:00', endTime: '09:30', subject: 'Biology', teacher: 'Dr. David Park', room: 'Room 301', classGroup: 'Grade 11B', status: getSlotStatus(4, 8) },
  { id: 'SCH-016', day: 'Friday', time: '09:45', endTime: '11:15', subject: 'Chemistry', teacher: 'Dr. James Chen', room: 'Lab 103', classGroup: 'Grade 11B', status: getSlotStatus(4, 10) },
  { id: 'SCH-017', day: 'Friday', time: '11:30', endTime: '13:00', subject: 'English Literature', teacher: 'Prof. Laura Williams', room: 'Room 305', classGroup: 'Grade 11B', status: getSlotStatus(4, 12) },
];

// Teacher-specific schedule
export const teacherSchedule: ScheduleSlot[] = [
  { id: 'TSCH-001', day: 'Monday', time: '08:00', endTime: '09:30', subject: 'Mathematics II', teacher: 'Dr. Alan Smith', room: 'Room 201', classGroup: 'Grade 11B', status: getSlotStatus(0, 8) },
  { id: 'TSCH-002', day: 'Monday', time: '09:45', endTime: '11:15', subject: 'Mathematics II', teacher: 'Dr. Alan Smith', room: 'Room 203', classGroup: 'Grade 11A', status: getSlotStatus(0, 10) },
  { id: 'TSCH-003', day: 'Monday', time: '11:30', endTime: '13:00', subject: 'Statistics', teacher: 'Dr. Alan Smith', room: 'Room 105', classGroup: 'Grade 12A', status: getSlotStatus(0, 12) },
  { id: 'TSCH-004', day: 'Monday', time: '14:00', endTime: '15:30', subject: 'Mathematics I', teacher: 'Dr. Alan Smith', room: 'Room 201', classGroup: 'Grade 10B', status: getSlotStatus(0, 14) },
  { id: 'TSCH-005', day: 'Tuesday', time: '08:00', endTime: '09:30', subject: 'Statistics', teacher: 'Dr. Alan Smith', room: 'Room 105', classGroup: 'Grade 11B', status: getSlotStatus(1, 8) },
  { id: 'TSCH-006', day: 'Tuesday', time: '09:45', endTime: '11:15', subject: 'Mathematics II', teacher: 'Dr. Alan Smith', room: 'Room 201', classGroup: 'Grade 11B', status: getSlotStatus(1, 10) },
  { id: 'TSCH-007', day: 'Wednesday', time: '08:00', endTime: '09:30', subject: 'Mathematics I', teacher: 'Dr. Alan Smith', room: 'Room 202', classGroup: 'Grade 10A', status: getSlotStatus(2, 8) },
  { id: 'TSCH-008', day: 'Wednesday', time: '09:45', endTime: '11:15', subject: 'Statistics', teacher: 'Dr. Alan Smith', room: 'Room 105', classGroup: 'Grade 12B', status: getSlotStatus(2, 10) },
  { id: 'TSCH-009', day: 'Thursday', time: '08:00', endTime: '09:30', subject: 'Mathematics II', teacher: 'Dr. Alan Smith', room: 'Room 201', classGroup: 'Grade 11B', status: getSlotStatus(3, 8) },
  { id: 'TSCH-010', day: 'Thursday', time: '09:45', endTime: '11:15', subject: 'Statistics', teacher: 'Dr. Alan Smith', room: 'Room 105', classGroup: 'Grade 11B', status: getSlotStatus(3, 10) },
  { id: 'TSCH-011', day: 'Friday', time: '08:00', endTime: '09:30', subject: 'Mathematics II', teacher: 'Dr. Alan Smith', room: 'Room 203', classGroup: 'Grade 11A', status: getSlotStatus(4, 8) },
  { id: 'TSCH-012', day: 'Friday', time: '09:45', endTime: '11:15', subject: 'Mathematics I', teacher: 'Dr. Alan Smith', room: 'Room 201', classGroup: 'Grade 10B', status: getSlotStatus(4, 10) },
];

export const payments: Payment[] = [
  { id: 'PAY-001', studentId: 'STU-001', studentName: 'John Smith', concept: 'Tuition Fee — Term 2', amount: 2400, paidAmount: 0, dueDate: '2026-07-15', status: 'pending' },
  { id: 'PAY-002', studentId: 'STU-001', studentName: 'John Smith', concept: 'Lab Fee — Chemistry', amount: 150, paidAmount: 0, dueDate: '2026-06-30', status: 'pending' },
  { id: 'PAY-003', studentId: 'STU-001', studentName: 'John Smith', concept: 'Library Fine', amount: 25, paidAmount: 0, dueDate: '2026-06-01', status: 'overdue' },
  { id: 'PAY-004', studentId: 'STU-001', studentName: 'John Smith', concept: 'Tuition Fee — Term 1', amount: 2400, paidAmount: 2400, dueDate: '2026-01-15', paidDate: '2026-01-10', status: 'paid', method: 'Bank Transfer', reference: 'TRF-20260110-001' },
  { id: 'PAY-005', studentId: 'STU-002', studentName: 'Emily Davis', concept: 'Lab Fee — Physics', amount: 150, paidAmount: 150, dueDate: '2026-03-15', paidDate: '2026-03-12', status: 'under_review', method: 'Online', reference: 'ONL-20260312-002' },
  { id: 'PAY-006', studentId: 'STU-003', studentName: 'Michael Brown', concept: 'Registration Fee', amount: 350, paidAmount: 350, dueDate: '2026-02-01', paidDate: '2026-01-28', status: 'validated', method: 'Cash', reference: 'CSH-20260128-003' },
  { id: 'PAY-007', studentId: 'STU-004', studentName: 'Sarah Johnson', concept: 'Tuition Fee — Term 1', amount: 1200, paidAmount: 0, dueDate: '2025-12-15', status: 'overdue' },
  { id: 'PAY-008', studentId: 'STU-005', studentName: 'Tom Wilson', concept: 'Tuition Fee — Term 2', amount: 2400, paidAmount: 0, dueDate: '2026-04-15', status: 'overdue' },
  { id: 'PAY-009', studentId: 'STU-006', studentName: 'Anna Lee', concept: 'Activity Fee', amount: 200, paidAmount: 100, dueDate: '2026-03-30', status: 'partial', method: 'Online' },
  { id: 'PAY-010', studentId: 'STU-007', studentName: 'Lucas Martin', concept: 'Tuition Fee — Term 2', amount: 2400, paidAmount: 2400, dueDate: '2026-04-01', paidDate: '2026-03-29', status: 'under_review', method: 'Bank Transfer' },
  { id: 'PAY-011', studentId: 'STU-008', studentName: 'Sofia Rodriguez', concept: 'Lab Fee — Chemistry', amount: 150, paidAmount: 0, dueDate: '2026-04-30', status: 'pending' },
  { id: 'PAY-012', studentId: 'STU-002', studentName: 'Emily Davis', concept: 'Tuition Fee — Term 2', amount: 2400, paidAmount: 2400, dueDate: '2026-04-01', paidDate: '2026-04-05', status: 'rejected', method: 'Online', reference: 'ONL-20260405-011' },
];

export const obligations: Obligation[] = [
  { id: 'OBL-001', concept: 'Tuition Fee — Term 2', amount: 2400, dueDate: '2026-07-15', category: 'tuition', studentId: 'STU-001', studentName: 'John Smith', status: 'active' },
  { id: 'OBL-002', concept: 'Lab Fee — Chemistry', amount: 150, dueDate: '2026-06-30', category: 'lab', studentId: 'STU-001', studentName: 'John Smith', status: 'active' },
  { id: 'OBL-003', concept: 'Library Fine', amount: 25, dueDate: '2026-06-01', category: 'material', studentId: 'STU-001', studentName: 'John Smith', status: 'overdue' },
  { id: 'OBL-004', concept: 'Tuition Fee — Term 1', amount: 2400, dueDate: '2026-01-15', category: 'tuition', studentId: 'STU-001', studentName: 'John Smith', status: 'paid' },
  { id: 'OBL-005', concept: 'Registration Fee', amount: 350, dueDate: '2026-02-01', category: 'registration', studentId: 'STU-003', studentName: 'Michael Brown', status: 'paid' },
  { id: 'OBL-006', concept: 'Tuition Fee — Term 1', amount: 1200, dueDate: '2025-12-15', category: 'tuition', studentId: 'STU-004', studentName: 'Sarah Johnson', status: 'overdue' },
  { id: 'OBL-007', concept: 'Tuition Fee — Term 2', amount: 2400, dueDate: '2026-04-15', category: 'tuition', studentId: 'STU-005', studentName: 'Tom Wilson', status: 'overdue' },
  { id: 'OBL-008', concept: 'Activity Fee', amount: 200, dueDate: '2026-03-30', category: 'activity', studentId: 'STU-006', studentName: 'Anna Lee', status: 'active' },
];

export const financeAccounts: FinanceAccount[] = [
  { id: 'ACC-001', studentId: 'STU-001', studentName: 'John Smith', totalDue: 4975, totalPaid: 2400, balance: 2575, lastPayment: '2026-01-10', status: 'current' },
  { id: 'ACC-002', studentId: 'STU-002', studentName: 'Emily Davis', totalDue: 2550, totalPaid: 150, balance: 2400, lastPayment: '2026-03-12', status: 'current' },
  { id: 'ACC-003', studentId: 'STU-003', studentName: 'Michael Brown', totalDue: 2750, totalPaid: 350, balance: 2400, lastPayment: '2026-01-28', status: 'current' },
  { id: 'ACC-004', studentId: 'STU-004', studentName: 'Sarah Johnson', totalDue: 3600, totalPaid: 2400, balance: 1200, status: 'delinquent' },
  { id: 'ACC-005', studentId: 'STU-005', studentName: 'Tom Wilson', totalDue: 4800, totalPaid: 2400, balance: 2400, status: 'delinquent' },
  { id: 'ACC-006', studentId: 'STU-006', studentName: 'Anna Lee', totalDue: 2600, totalPaid: 2500, balance: 100, lastPayment: '2026-03-15', status: 'current' },
  { id: 'ACC-007', studentId: 'STU-007', studentName: 'Lucas Martin', totalDue: 4800, totalPaid: 4800, balance: 0, lastPayment: '2026-03-29', status: 'paid_up' },
  { id: 'ACC-008', studentId: 'STU-008', studentName: 'Sofia Rodriguez', totalDue: 2550, totalPaid: 2400, balance: 150, lastPayment: '2026-02-20', status: 'current' },
];

export const notifications: NotificationItem[] = [
  { id: 'NOT-001', title: 'New Grade Posted', message: 'Mathematics II — Midterm Exam: 18/20', type: 'grade', timestamp: '2026-04-09T10:30:00', read: false },
  { id: 'NOT-002', title: 'Attendance Alert', message: 'You were marked absent in Biology on Apr 4', type: 'attendance', timestamp: '2026-04-04T16:00:00', read: false },
  { id: 'NOT-003', title: 'Payment Overdue', message: 'Library Fine of $25 is past due', type: 'payment', timestamp: '2026-06-02T09:00:00', read: false },
  { id: 'NOT-004', title: 'Midterm Schedule Published', message: 'The midterm exam schedule for Term 2 is now available', type: 'announcement', timestamp: '2026-04-07T08:00:00', read: true },
  { id: 'NOT-005', title: 'Biology Needs Attention', message: 'Your progress in Biology is at 45%. Review recent materials.', type: 'alert', timestamp: '2026-04-06T14:00:00', read: true },
  { id: 'NOT-006', title: 'Message from Dr. Alan Smith', message: 'Great job on the Midterm! Keep up the good work.', type: 'message', timestamp: '2026-04-05T11:30:00', read: true },
  { id: 'NOT-007', title: 'Lab Report Due', message: 'Chemistry lab report #5 is due on Apr 12', type: 'announcement', timestamp: '2026-04-03T09:00:00', read: true },
  { id: 'NOT-008', title: 'Payment Received', message: 'Tuition Fee — Term 1 payment confirmed', type: 'payment', timestamp: '2026-01-10T12:00:00', read: true },
];

export const feedItems: FeedItem[] = [
  { id: 'FEED-001', author: 'Administration', authorRole: 'Executive', title: 'Midterm Exam Schedule Published', content: 'The midterm examination schedule for Term 2 has been published. Please check your schedule page for dates and rooms. Contact the secretary office for conflicts.', timestamp: '2026-04-07T08:00:00', category: 'announcement', pinned: true },
  { id: 'FEED-002', author: 'Dr. David Park', authorRole: 'Teacher', title: 'Biology Field Trip — April 18', content: 'We will be visiting the National Botanical Garden on April 18. Permission slips must be submitted by April 14. Bring comfortable shoes and a notebook.', timestamp: '2026-04-06T14:30:00', category: 'event' },
  { id: 'FEED-003', author: 'Prof. Elena Garcia', authorRole: 'Teacher', title: 'Physics Lab Safety Reminder', content: 'All students must wear safety goggles and closed-toe shoes during lab sessions. Students without proper equipment will not be allowed to participate.', timestamp: '2026-04-05T10:00:00', category: 'academic' },
  { id: 'FEED-004', author: 'Student Council', authorRole: 'Student', title: 'Spring Festival Volunteers Needed', content: 'Sign up to volunteer for the Spring Festival on May 2. We need help with decorations, food stalls, and performances. Sign up at the student council office.', timestamp: '2026-04-04T13:00:00', category: 'event' },
  { id: 'FEED-005', author: 'Dr. Alan Smith', authorRole: 'Teacher', title: 'Mathematics II — Extra Office Hours', content: 'I will be holding extra office hours this week: Wednesday 3-5 PM and Thursday 3-5 PM in Room 201. Come prepared with questions from chapters 7-9.', timestamp: '2026-04-03T09:00:00', category: 'academic' },
  { id: 'FEED-006', author: 'Administration', authorRole: 'Executive', title: 'School Closure — April 21', content: 'The school will be closed on April 21 for a national holiday. All classes and activities are suspended. Regular schedule resumes on April 22.', timestamp: '2026-04-02T08:00:00', category: 'announcement' },
];

export const knowledgeItems: KnowledgeItem[] = [
  { id: 'KNW-001', title: 'Calculus: Limits and Continuity', description: 'Complete guide to limits, continuity, and the epsilon-delta definition.', subject: 'Mathematics II', type: 'document', author: 'Dr. Alan Smith', date: '2026-03-28', size: '2.4 MB' },
  { id: 'KNW-002', title: 'Newton\'s Laws of Motion', description: 'Video lecture covering all three laws with real-world examples.', subject: 'Physics', type: 'video', author: 'Prof. Elena Garcia', date: '2026-03-25', size: '145 MB' },
  { id: 'KNW-003', title: 'Organic Chemistry Basics', description: 'Introduction to carbon compounds, functional groups, and nomenclature.', subject: 'Chemistry', type: 'presentation', author: 'Dr. James Chen', date: '2026-03-20', size: '8.1 MB' },
  { id: 'KNW-004', title: 'Shakespeare: Hamlet Analysis', description: 'Literary analysis of themes, characters, and dramatic techniques in Hamlet.', subject: 'English Literature', type: 'document', author: 'Prof. Laura Williams', date: '2026-03-18', size: '1.2 MB' },
  { id: 'KNW-005', title: 'Cell Division — Mitosis & Meiosis', description: 'Interactive quiz on the stages of cell division.', subject: 'Biology', type: 'quiz', author: 'Dr. David Park', date: '2026-03-15', size: '320 KB' },
  { id: 'KNW-006', title: 'Probability Distributions', description: 'Reference sheet for normal, binomial, and Poisson distributions.', subject: 'Statistics', type: 'document', author: 'Dr. Alan Smith', date: '2026-03-12', size: '890 KB' },
  { id: 'KNW-007', title: 'Lab Safety Guidelines', description: 'Mandatory safety protocols for all science laboratory sessions.', subject: 'Chemistry', type: 'link', author: 'Dr. James Chen', date: '2026-03-10' },
  { id: 'KNW-008', title: 'Integration Techniques', description: 'Practice problems for substitution, partial fractions, and integration by parts.', subject: 'Mathematics II', type: 'document', author: 'Dr. Alan Smith', date: '2026-04-01', size: '1.8 MB' },
];

export const assessments: Assessment[] = [
  { id: 'ASM-001', title: 'Midterm Exam', subject: 'Mathematics II', classGroup: 'Grade 11B', type: 'exam', date: '2026-04-22', weight: 40, status: 'upcoming', totalStudents: 31, gradedCount: 0 },
  { id: 'ASM-002', title: 'Lab Practical', subject: 'Chemistry', classGroup: 'Grade 11B', type: 'lab', date: '2026-04-25', weight: 15, status: 'upcoming', totalStudents: 31, gradedCount: 0 },
  { id: 'ASM-003', title: 'Midterm Exam', subject: 'Statistics', classGroup: 'Grade 12A', type: 'exam', date: '2026-04-20', weight: 40, status: 'published', totalStudents: 26, gradedCount: 0 },
  { id: 'ASM-004', title: 'Essay #3', subject: 'English Literature', classGroup: 'Grade 11B', type: 'project', date: '2026-04-15', weight: 20, status: 'graded', totalStudents: 31, gradedCount: 31 },
  { id: 'ASM-005', title: 'Quiz #4', subject: 'Biology', classGroup: 'Grade 11B', type: 'quiz', date: '2026-04-10', weight: 10, status: 'graded', totalStudents: 31, gradedCount: 28 },
  { id: 'ASM-006', title: 'Lab Report #5', subject: 'Physics', classGroup: 'Grade 11B', type: 'lab', date: '2026-04-12', weight: 15, status: 'published', totalStudents: 31, gradedCount: 12 },
  { id: 'ASM-007', title: 'Homework #6', subject: 'Mathematics II', classGroup: 'Grade 11A', type: 'quiz', date: '2026-04-08', weight: 5, status: 'graded', totalStudents: 28, gradedCount: 28 },
];

/* ─── Helper functions ─── */
export function getStudentGrades(studentId: string) {
  return grades.filter(g => g.studentId === studentId);
}

export function getStudentAttendance(studentId: string) {
  return attendanceRecords.filter(a => a.studentId === studentId);
}

export function getStudentPayments(studentId: string) {
  return payments.filter(p => p.studentId === studentId);
}

export function getStudentObligations(studentId: string) {
  return obligations.filter(o => o.studentId === studentId);
}

export function getTodaySchedule(schedule: ScheduleSlot[]) {
  const days: ScheduleSlot['day'][] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const todayDay = days[new Date().getDay() - 1] || 'Monday';
  return schedule.filter(s => s.day === todayDay);
}

export function getSubjectAverage(studentId: string, subjectId: string) {
  const subjectGrades = grades.filter(g => g.studentId === studentId && g.subjectId === subjectId);
  if (!subjectGrades.length) return 0;
  const totalWeight = subjectGrades.reduce((sum, g) => sum + g.weight, 0);
  const weightedSum = subjectGrades.reduce((sum, g) => sum + (g.score / g.maxScore) * g.weight, 0);
  return totalWeight > 0 ? Math.round((weightedSum / totalWeight) * 20 * 10) / 10 : 0;
}

/* ─── Finance aggregates ─── */
export const financeStats = {
  totalPending: payments.filter(p => ['pending', 'partial'].includes(p.status)).reduce((s, p) => s + (p.amount - p.paidAmount), 0),
  totalValidated: payments.filter(p => p.status === 'validated').reduce((s, p) => s + p.paidAmount, 0),
  totalOverdue: payments.filter(p => p.status === 'overdue').reduce((s, p) => s + p.amount, 0),
  todayPayments: payments.filter(p => p.paidDate?.startsWith('2026-04-09')).length || 3,
  pendingValidation: payments.filter(p => p.status === 'under_review').length,
  overdueStudents: new Set(payments.filter(p => p.status === 'overdue').map(p => p.studentId)).size,
};
