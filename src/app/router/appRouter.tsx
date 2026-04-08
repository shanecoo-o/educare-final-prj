import { Route, Routes, Navigate } from 'react-router-dom';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { RoleLayout } from '@/components/layout/RoleLayout';
import { AuthGuard } from '@/app/guards/AuthGuard';
import { RoleGuard } from '@/app/guards/RoleGuard';
import NotFound from '@/pages/NotFound';

// Public
import LandingPage from '@/pages/public/LandingPage';
import LoginPage from '@/pages/auth/LoginPage';

// Shared
import SettingsPage from '@/pages/app/SettingsPage';

// Student
import { StudentDashboard, StudentGrades, StudentAttendance, StudentSchedule, StudentAgenda, StudentKnowledge, StudentFeed, StudentChat, StudentNotifications, StudentFinance } from '@/pages/role/StudentPages';

// Guardian
import { GuardianDashboard, GuardianStudents, GuardianPerformance, GuardianAttendance, GuardianSchedule, GuardianFinance, GuardianPayments, GuardianDocuments, GuardianChat, GuardianNotifications } from '@/pages/role/GuardianPages';

// Teacher
import { TeacherDashboard, TeacherSchedule, TeacherClasses, TeacherAttendance, TeacherAssessments, TeacherGradebook, TeacherKnowledge, TeacherChat, TeacherNotifications } from '@/pages/role/TeacherPages';

// Pedagogy
import { PedagogyDashboard, PedagogyAnalytics, PedagogyClasses, PedagogyTeachers, PedagogyAttendance, PedagogySchedule, PedagogyRisk, PedagogyReports } from '@/pages/role/PedagogyPages';

// Executive
import { ExecutiveDashboard, ExecutiveFinance, ExecutiveAcademic, ExecutiveEnrollment, ExecutiveReports, ExecutiveAudit } from '@/pages/role/ExecutivePages';

// Secretary
import { SecretaryDashboard, SecretaryAdmissions, SecretaryEnrollments, SecretaryStudents, SecretaryDocuments, SecretaryClasses, SecretarySchedule, SecretaryRegularity } from '@/pages/role/SecretaryPages';

// Finance
import { FinanceDashboard, FinancePayments, FinanceValidation, FinanceObligations, FinanceAccounts, FinanceReceipts, FinancePenalties, FinanceTreasury, FinanceReports } from '@/pages/role/FinancePages';

export function AppRouter() {
  return (
    <Routes>
      {/* ─── Public ─── */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<LandingPage />} />
        <Route path="/contact" element={<LandingPage />} />
        <Route path="/apply" element={<LandingPage />} />
        <Route path="/apply/status" element={<LandingPage />} />
      </Route>

      {/* ─── Auth ─── */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<LoginPage />} />
      <Route path="/reset-password" element={<LoginPage />} />

      {/* ─── Authenticated ─── */}
      <Route element={<AuthGuard />}>
        <Route path="/app" element={<RoleLayout />}>
          {/* Shared */}
          <Route path="settings" element={<SettingsPage />} />
          <Route path="profile" element={<SettingsPage />} />

          {/* ─── Student zone ─── */}
          <Route element={<RoleGuard allowed={['student']} />}>
            <Route path="student/dashboard" element={<StudentDashboard />} />
            <Route path="student/grades" element={<StudentGrades />} />
            <Route path="student/attendance" element={<StudentAttendance />} />
            <Route path="student/schedule" element={<StudentSchedule />} />
            <Route path="student/agenda" element={<StudentAgenda />} />
            <Route path="student/knowledge" element={<StudentKnowledge />} />
            <Route path="student/finance" element={<StudentFinance />} />
            <Route path="student/feed" element={<StudentFeed />} />
            <Route path="student/chat" element={<StudentChat />} />
            <Route path="student/notifications" element={<StudentNotifications />} />
          </Route>

          {/* ─── Guardian zone ─── */}
          <Route element={<RoleGuard allowed={['guardian']} />}>
            <Route path="guardian/dashboard" element={<GuardianDashboard />} />
            <Route path="guardian/students" element={<GuardianStudents />} />
            <Route path="guardian/performance" element={<GuardianPerformance />} />
            <Route path="guardian/attendance" element={<GuardianAttendance />} />
            <Route path="guardian/schedule" element={<GuardianSchedule />} />
            <Route path="guardian/finance" element={<GuardianFinance />} />
            <Route path="guardian/payments" element={<GuardianPayments />} />
            <Route path="guardian/documents" element={<GuardianDocuments />} />
            <Route path="guardian/chat" element={<GuardianChat />} />
            <Route path="guardian/notifications" element={<GuardianNotifications />} />
          </Route>

          {/* ─── Teacher zone ─── */}
          <Route element={<RoleGuard allowed={['teacher']} />}>
            <Route path="teacher/dashboard" element={<TeacherDashboard />} />
            <Route path="teacher/schedule" element={<TeacherSchedule />} />
            <Route path="teacher/classes" element={<TeacherClasses />} />
            <Route path="teacher/attendance" element={<TeacherAttendance />} />
            <Route path="teacher/assessments" element={<TeacherAssessments />} />
            <Route path="teacher/gradebook" element={<TeacherGradebook />} />
            <Route path="teacher/knowledge" element={<TeacherKnowledge />} />
            <Route path="teacher/chat" element={<TeacherChat />} />
            <Route path="teacher/notifications" element={<TeacherNotifications />} />
          </Route>

          {/* ─── Pedagogy zone ─── */}
          <Route element={<RoleGuard allowed={['pedagogy']} />}>
            <Route path="pedagogy/dashboard" element={<PedagogyDashboard />} />
            <Route path="pedagogy/analytics" element={<PedagogyAnalytics />} />
            <Route path="pedagogy/classes" element={<PedagogyClasses />} />
            <Route path="pedagogy/teachers" element={<PedagogyTeachers />} />
            <Route path="pedagogy/attendance" element={<PedagogyAttendance />} />
            <Route path="pedagogy/schedule" element={<PedagogySchedule />} />
            <Route path="pedagogy/risk" element={<PedagogyRisk />} />
            <Route path="pedagogy/reports" element={<PedagogyReports />} />
          </Route>

          {/* ─── Executive zone ─── */}
          <Route element={<RoleGuard allowed={['executive']} />}>
            <Route path="executive/dashboard" element={<ExecutiveDashboard />} />
            <Route path="executive/finance" element={<ExecutiveFinance />} />
            <Route path="executive/academic" element={<ExecutiveAcademic />} />
            <Route path="executive/enrollment" element={<ExecutiveEnrollment />} />
            <Route path="executive/reports" element={<ExecutiveReports />} />
            <Route path="executive/audit" element={<ExecutiveAudit />} />
          </Route>

          {/* ─── Secretary zone ─── */}
          <Route element={<RoleGuard allowed={['secretary']} />}>
            <Route path="secretary/dashboard" element={<SecretaryDashboard />} />
            <Route path="secretary/admissions" element={<SecretaryAdmissions />} />
            <Route path="secretary/enrollments" element={<SecretaryEnrollments />} />
            <Route path="secretary/students" element={<SecretaryStudents />} />
            <Route path="secretary/documents" element={<SecretaryDocuments />} />
            <Route path="secretary/classes" element={<SecretaryClasses />} />
            <Route path="secretary/schedule" element={<SecretarySchedule />} />
            <Route path="secretary/regularity" element={<SecretaryRegularity />} />
          </Route>

          {/* ─── Finance zone (ISOLATED) ─── */}
          <Route element={<RoleGuard allowed={['finance']} />}>
            <Route path="finance/dashboard" element={<FinanceDashboard />} />
            <Route path="finance/payments" element={<FinancePayments />} />
            <Route path="finance/validation" element={<FinanceValidation />} />
            <Route path="finance/obligations" element={<FinanceObligations />} />
            <Route path="finance/accounts" element={<FinanceAccounts />} />
            <Route path="finance/receipts" element={<FinanceReceipts />} />
            <Route path="finance/penalties" element={<FinancePenalties />} />
            <Route path="finance/treasury" element={<FinanceTreasury />} />
            <Route path="finance/reports" element={<FinanceReports />} />
          </Route>
        </Route>
      </Route>

      {/* ─── Catch-all ─── */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
