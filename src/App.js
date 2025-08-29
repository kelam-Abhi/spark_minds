import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import Login from './components/Auth/Login';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import MentorDashboard from './components/Dashboard/MentorDashboard';
import TraineeDashboard from './components/Dashboard/TraineeDashboard';
import UserManagement from './components/Admin/UserManagement';
import CourseManagement from './components/Admin/CourseManagement';
import ClassManagement from './components/Admin/ClassManagement';
import TaskManagement from './components/Admin/TaskManagement';
import Notifications from './components/Admin/Notifications';
import ReportsAnalytics from './components/Admin/ReportsAnalytics';
import AdminSettings from './components/Admin/Settings';
import AdminProfile from './components/Admin/AdminProfile';
// Import new mentor management components
import MentorTaskManagement from './components/Mentor/MentorTaskManagement';
import MentorTraineeManagement from './components/Mentor/MentorTraineeManagement';
import MentorClassManagement from './components/Mentor/MentorClassManagement';
import MentorTestManagement from './components/Mentor/MentorTestManagement';
import MentorProfile from './components/Mentor/MentorProfile';
import MentorNotifications from './components/Mentor/MentorNotifications';
import TraineeCourses from './components/Trainee/TraineeCourses';
import TraineeAssignments from './components/Trainee/TraineeAssignments';
import TraineeProfile from './components/Trainee/TraineeProfile';
import TraineeClasses from './components/Trainee/TraineeClasses';
import TraineePerformance from './components/Trainee/TraineePerformance';
import TaskSubmission from './components/Trainee/TaskSubmission';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Direct Dashboard Routes - Simplified Structure */}
        <Route path="/admin-dashboard" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="courses" element={<CourseManagement />} />
          <Route path="classes" element={<ClassManagement />} />
          <Route path="tasks" element={<TaskManagement />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="reports" element={<ReportsAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>
        
        <Route path="/mentor-dashboard" element={
          <ProtectedRoute allowedRoles={['mentor']}>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<MentorDashboard />} />
          <Route path="profile" element={<MentorProfile />} />
          {/* Add new mentor management routes */}
          <Route path="create-trainee" element={<MentorTraineeManagement />} />
          <Route path="assign-task" element={<MentorTaskManagement />} />
          <Route path="schedule-class" element={<MentorClassManagement />} />
          <Route path="create-test" element={<MentorTestManagement />} />
          <Route path="classes" element={<MentorClassManagement />} />
          <Route path="tests" element={<MentorTestManagement />} />
          <Route path="notifications" element={<MentorNotifications />} />
          <Route path="reports" element={<MentorDashboard />} />
          <Route path="reports/trainee-analytics" element={<MentorDashboard />} />
          <Route path="reports/course-analytics" element={<MentorDashboard />} />
          <Route path="reports/class-analytics" element={<MentorDashboard />} />
        </Route>
        
        <Route path="/trainee-dashboard" element={
          <ProtectedRoute allowedRoles={['trainee']}>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<TraineeDashboard />} />
          <Route path="courses" element={<TraineeCourses />} />
          <Route path="classes" element={<TraineeClasses />} />
          <Route path="assignments" element={<TraineeAssignments />} />
          <Route path="performance" element={<TraineePerformance />} />
          <Route path="tasks" element={<TaskSubmission />} />
          <Route path="profile" element={<TraineeProfile />} />
        </Route>
        
        {/* Legacy route redirects for backward compatibility */}
        <Route path="/admin" element={<Navigate to="/admin-dashboard" replace />} />
        <Route path="/mentor" element={<Navigate to="/mentor-dashboard" replace />} />
        <Route path="/trainee" element={<Navigate to="/trainee-dashboard" replace />} />
        
        {/* Temporary debug route */}
        <Route path="/debug" element={
          <div style={{ padding: '20px', fontFamily: 'monospace' }}>
            <h1>Debug Information</h1>
            <p>Current path: {window.location.pathname}</p>
            <p>Check console for detailed logs</p>
            <button onClick={() => window.location.href = '/login'}>Go to Login</button>
          </div>
        } />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
