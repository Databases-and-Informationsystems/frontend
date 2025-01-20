import DashboardLayout from '@/features/dashboard/components/DashboardLayout';
import { Routes, Route } from 'react-router';
import Dashboard from '@/features/dashboard/components/Dashboard';
import ProjectPage from '@/features/projects/components/ProjectPage';
import SchemaPage from '@/features/schema/SchemaPage';
import Login from '@/features/login/pages/Login';
import Teams from '@/features/Teams/Teams';
import Settings from '@/features/settings/Settings';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="teams" element={<Teams/>} />
        
        <Route path="projects" element={<ProjectPage />} />
        <Route path="schemas" element={<SchemaPage/>} />
        <Route path="projects/settings" element={<Settings/>} />
      </Route>

      <Route path="/annotation" element={<div>Annotation</div>} />
    </Routes>
  );
};

export default AppRoutes;
