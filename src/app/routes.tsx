import { Routes, Route } from 'react-router';
import DashboardLayout from '@/features/dashboard/components/DashboardLayout';
import Login from '@/features/login/pages/Login';
import Settings from '@/features/dashboard/Settings/Settings';
import Teams from '@/features/dashboard/Teams/Teams';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<div>Overview</div>} /> {/* Default dashboard view */}
        <Route path="teams" element={<Teams />} />
        <Route path="projects" element={<div>Projects</div>} />
        <Route path="schemas" element={<div>Schemas</div>} />
        <Route path="settings" element={<Settings />} /> {/* Lowercase path */}
      </Route>

      <Route path="/annotation" element={<div>Annotation</div>} />
    </Routes>
  );
};

export default AppRoutes;