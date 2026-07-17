import React from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import AppShell from './layouts/AppShell';

import LoginPage from './pages/shared/LoginPage';
import PublicLandingPage from './pages/shared/PublicLandingPage';
import ForgotPasswordPage from './pages/shared/ForgotPasswordPage';
import FirstLoginSetupPage from './pages/shared/FirstLoginSetupPage';
import ProfileSettingsPage from './pages/shared/ProfileSettingsPage';
import NotificationCenterPage from './pages/shared/NotificationCenterPage';
import ExperienceHubPage from './pages/shared/ExperienceHubPage';

import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import UserManagementPage from './pages/admin/UserManagementPage';
import CreateEditUserPage from './pages/admin/CreateEditUserPage';
import BulkImportUsersPage from './pages/admin/BulkImportUsersPage';
import SystemConfigurationPage from './pages/admin/SystemConfigurationPage';

import CoordinatorDashboardPage from './pages/coordinator/CoordinatorDashboardPage';
import ProgramsPage from './pages/coordinator/ProgramsPage';
import ProgramDetailPage from './pages/coordinator/ProgramDetailPage';
import CoursesPage from './pages/coordinator/CoursesPage';
import ClassesPage from './pages/coordinator/ClassesPage';
import EnrollmentPage from './pages/coordinator/EnrollmentPage';

import MentorDashboardPage from './pages/mentor/MentorDashboardPage';
import MyClassesPage from './pages/mentor/MyClassesPage';
import ClassDetailPage from './pages/mentor/ClassDetailPage';
import SessionDetailPage from './pages/mentor/SessionDetailPage';
import AttendancePage from './pages/mentor/AttendancePage';
import MaterialsPage from './pages/mentor/MaterialsPage';
import AssignmentsPage from './pages/mentor/AssignmentsPage';
import GradingPage from './pages/mentor/GradingPage';

import StudentDashboardPage from './pages/student/StudentDashboardPage';
import MyCoursesPage from './pages/student/MyCoursesPage';
import SessionsPage from './pages/student/SessionsPage';
import AssignmentListPage from './pages/student/AssignmentListPage';
import AssignmentDetailPage from './pages/student/AssignmentDetailPage';
import GradeFeedbackPage from './pages/student/GradeFeedbackPage';

const Shell = ({ children }) => <AppShell>{children}</AppShell>;

function StudentOnlyExperience({ mode }) {
  const { role } = useParams();
  if (role !== 'student') return <Navigate to={`/${role || 'student'}`} replace />;
  return <Shell><ExperienceHubPage mode={mode} /></Shell>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/welcome" replace />} />
      <Route path="/welcome" element={<PublicLandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/first-login" element={<FirstLoginSetupPage />} />

      <Route path="/:role/ai" element={<StudentOnlyExperience mode="ai" />} />
      <Route path="/:role/assessments" element={<StudentOnlyExperience mode="assessments" />} />
      <Route path="/mentor/meet" element={<Shell><ExperienceHubPage mode="meet" /></Shell>} />
      <Route path="/:role/wallet" element={<Shell><ExperienceHubPage mode="wallet" /></Shell>} />

      <Route path="/profile" element={<Shell><ProfileSettingsPage /></Shell>} />
      <Route path="/notifications" element={<Shell><NotificationCenterPage /></Shell>} />

      <Route path="/admin" element={<Shell><AdminDashboardPage /></Shell>} />
      <Route path="/admin/users" element={<Shell><UserManagementPage /></Shell>} />
      <Route path="/admin/users/new" element={<Shell><CreateEditUserPage /></Shell>} />
      <Route path="/admin/users/import" element={<Shell><BulkImportUsersPage /></Shell>} />
      <Route path="/admin/config" element={<Shell><SystemConfigurationPage /></Shell>} />

      <Route path="/coordinator" element={<Shell><CoordinatorDashboardPage /></Shell>} />
      <Route path="/coordinator/programs" element={<Shell><ProgramsPage /></Shell>} />
      <Route path="/coordinator/programs/:programId" element={<Shell><ProgramDetailPage /></Shell>} />
      <Route path="/coordinator/courses" element={<Shell><CoursesPage /></Shell>} />
      <Route path="/coordinator/classes" element={<Shell><ClassesPage /></Shell>} />
      <Route path="/coordinator/enrollment" element={<Shell><EnrollmentPage /></Shell>} />

      <Route path="/mentor" element={<Shell><MentorDashboardPage /></Shell>} />
      <Route path="/mentor/classes" element={<Shell><MyClassesPage /></Shell>} />
      <Route path="/mentor/classes/:classId" element={<Shell><ClassDetailPage /></Shell>} />
      <Route path="/mentor/session" element={<Shell><SessionDetailPage /></Shell>} />
      <Route path="/mentor/attendance" element={<Shell><AttendancePage /></Shell>} />
      <Route path="/mentor/materials" element={<Shell><MaterialsPage /></Shell>} />
      <Route path="/mentor/assignments" element={<Shell><AssignmentsPage /></Shell>} />
      <Route path="/mentor/grading" element={<Shell><GradingPage /></Shell>} />

      <Route path="/student" element={<Shell><StudentDashboardPage /></Shell>} />
      <Route path="/student/courses" element={<Shell><MyCoursesPage /></Shell>} />
      <Route path="/student/sessions" element={<Shell><SessionsPage /></Shell>} />
      <Route path="/student/assignments" element={<Shell><AssignmentListPage /></Shell>} />
      <Route path="/student/assignments/:assignmentId" element={<Shell><AssignmentDetailPage /></Shell>} />
      <Route path="/student/grades/:assignmentId" element={<Shell><GradeFeedbackPage /></Shell>} />

      <Route path="*" element={<Navigate to="/student" replace />} />
    </Routes>
  );
}
