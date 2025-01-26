import DashboardLayout from '@/features/dashboard/components/DashboardLayout'
import { Routes, Route, Navigate } from 'react-router'
import Dashboard from '@/features/dashboard/pages/Dashboard'
import ProjectPage from '@/features/projects/components/ProjectPage'
import SchemaPage from '@/features/schema/components/SchemaPage'
import SchemasPage from '@/features/schema/components/SchemasPage'
import Login from '@/features/login/pages/Login'
import Teams from '@/features/teams/page/Teams'
import Settings from '@/features/settings/Settings'
import { ProtectedRoute } from '@/components/ProtectedRoute'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="teams" element={<Teams />} />

          <Route path="projects" element={<ProjectPage />} />
          <Route path="schemas/:id" element={<SchemaPage />} />
          <Route path="schemas" element={<SchemasPage />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/annotation" element={<div>Annotation</div>} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default AppRoutes
