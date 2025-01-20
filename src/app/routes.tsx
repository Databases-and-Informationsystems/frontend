import DashboardLayout from '@/features/dashboard/components/DashboardLayout';
import { Routes, Route, Navigate } from 'react-router';
import Dashboard from '@/features/dashboard/pages/Dashboard';
import ProjectPage from '@/features/projects/components/ProjectPage';
import SchemaPage from '@/features/schema/SchemaPage';
import Login from '@/features/login/pages/Login';
import Teams from '@/features/teams/page/Teams';
import Settings from '@/features/settings/Settings';
import { ProtectedRoute } from '@/components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="teams" element={<Teams />} />

          <Route path="projects" element={<ProjectPage />} />
          <Route path="schemas" element={<SchemaPage />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
      <Route path="/annotation" element={<div>Annotation</div>} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
