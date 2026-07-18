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
import WeeklyTimetablePage from './pages/shared/WeeklyTimetablePage';

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
import AIConversationPage from './pages/student/AIConversationPage';

const Shell = ({ children, view }) => <AppShell><div className={`route-canvas route-canvas--${view}`}>{children}</div></AppShell>;

function StudentOnlyExperience({ mode }) {
  const { role } = useParams();
  if (role !== 'student') return <Navigate to={`/${role || 'student'}`} replace />;
  return <Shell view={`student-${mode}`}><ExperienceHubPage mode={mode} /></Shell>;
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
      <Route path="/mentor/meet" element={<Shell view="mentor-meet"><ExperienceHubPage mode="meet" /></Shell>} />
      <Route path="/:role/wallet" element={<Shell view="shared-wallet"><ExperienceHubPage mode="wallet" /></Shell>} />

      <Route path="/profile" element={<Shell view="shared-profile"><ProfileSettingsPage /></Shell>} />
      <Route path="/notifications" element={<Shell view="shared-notifications"><NotificationCenterPage /></Shell>} />

      <Route path="/admin" element={<Shell view="admin-overview"><AdminDashboardPage /></Shell>} />
      <Route path="/admin/users" element={<Shell view="admin-users"><UserManagementPage /></Shell>} />
      <Route path="/admin/users/new" element={<Shell view="admin-user-form"><CreateEditUserPage /></Shell>} />
      <Route path="/admin/users/import" element={<Shell view="admin-user-import"><BulkImportUsersPage /></Shell>} />
      <Route path="/admin/config" element={<Shell view="admin-config"><SystemConfigurationPage /></Shell>} />
      <Route path="/admin/timetable" element={<Shell view="admin-timetable"><WeeklyTimetablePage role="admin" /></Shell>} />

      <Route path="/coordinator" element={<Shell view="coordinator-overview"><CoordinatorDashboardPage /></Shell>} />
      <Route path="/coordinator/programs" element={<Shell view="coordinator-programs"><ProgramsPage /></Shell>} />
      <Route path="/coordinator/programs/:programId" element={<Shell view="coordinator-program-detail"><ProgramDetailPage /></Shell>} />
      <Route path="/coordinator/courses" element={<Shell view="coordinator-courses"><CoursesPage /></Shell>} />
      <Route path="/coordinator/classes" element={<Shell view="coordinator-classes"><ClassesPage /></Shell>} />
      <Route path="/coordinator/enrollment" element={<Shell view="coordinator-enrollment"><EnrollmentPage /></Shell>} />
      <Route path="/coordinator/timetable" element={<Shell view="coordinator-timetable"><WeeklyTimetablePage role="coordinator" /></Shell>} />

      <Route path="/mentor" element={<Shell view="mentor-overview"><MentorDashboardPage /></Shell>} />
      <Route path="/mentor/classes" element={<Shell view="mentor-classes"><MyClassesPage /></Shell>} />
      <Route path="/mentor/classes/:classId" element={<Shell view="mentor-class-detail"><ClassDetailPage /></Shell>} />
      <Route path="/mentor/session" element={<Shell view="mentor-session"><SessionDetailPage /></Shell>} />
      <Route path="/mentor/attendance" element={<Shell view="mentor-attendance"><AttendancePage /></Shell>} />
      <Route path="/mentor/materials" element={<Shell view="mentor-materials"><MaterialsPage /></Shell>} />
      <Route path="/mentor/assignments" element={<Shell view="mentor-assignments"><AssignmentsPage /></Shell>} />
      <Route path="/mentor/grading" element={<Shell view="mentor-grading"><GradingPage /></Shell>} />
      <Route path="/mentor/timetable" element={<Shell view="mentor-timetable"><WeeklyTimetablePage role="mentor" /></Shell>} />

      <Route path="/student" element={<Shell view="student-overview"><StudentDashboardPage /></Shell>} />
      <Route path="/student/courses" element={<Shell view="student-courses"><MyCoursesPage /></Shell>} />
      <Route path="/student/sessions" element={<Shell view="student-sessions"><SessionsPage /></Shell>} />
      <Route path="/student/timetable" element={<Shell view="student-timetable"><WeeklyTimetablePage role="student" /></Shell>} />
      <Route path="/student/assignments" element={<Shell view="student-assignments"><AssignmentListPage /></Shell>} />
      <Route path="/student/assignments/:assignmentId" element={<Shell view="student-assignment-detail"><AssignmentDetailPage /></Shell>} />
      <Route path="/student/grades/:assignmentId" element={<Shell view="student-grade-feedback"><GradeFeedbackPage /></Shell>} />
      <Route path="/student/ai/session" element={<Shell view="student-ai-session"><AIConversationPage /></Shell>} />

      <Route path="*" element={<Navigate to="/student" replace />} />
    </Routes>
  );
}
