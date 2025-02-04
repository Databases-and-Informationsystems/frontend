import { AnnotationLayout } from '@/features/annotation_tool/components/AnnotationLayout'
import DashboardLayout from '@/features/dashboard/components/DashboardLayout'
import { Routes, Route, Navigate } from 'react-router'
import Dashboard from '@/features/dashboard/pages/Dashboard'
import ProjectPage from '@/features/projects/components/ProjectPage'
import ProjectV2Page from '@/features/projects/pages/ProjectV2Page'
import SchemaPage from '@/features/schema/pages/SchemaPage'
import SchemasPage from '@/features/schema/pages/SchemasPage'
import Login from '@/features/login/pages/Login'
import Teams from '@/features/teams/page/Teams'
import Settings from '@/features/settings/Settings'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import CreateSchemaPage from '@/features/schema/pages/CreateSchemaPage'
import Heatmap from '@/features/heatmap/pages/Heatmap'
import ProjectsV2Page from '@/features/projects/pages/ProjectsV2Page'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="teams" element={<Teams />} />

          <Route path={`projects-v2/:id`} element={<ProjectV2Page />} />
          <Route path="projects-v2" element={<ProjectsV2Page />} />
          <Route path="projects" element={<ProjectPage />} />
          <Route path="schemas/create" element={<CreateSchemaPage />} />
          <Route path="schemas/:id" element={<SchemaPage />} />
          <Route path="schemas" element={<SchemasPage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="heatmap/:id" element={<Heatmap />} />
        </Route>
        <Route path="/annotation/:id" element={<AnnotationLayout/>} />
      </Route>

      {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
    </Routes>
  )
}

export default AppRoutes
