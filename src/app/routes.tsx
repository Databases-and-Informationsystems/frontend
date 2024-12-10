import DashboardLayout from '@/features/dashboard/components/DashboardLayout'
import { Routes, Route } from 'react-router'
import Dashboard from '@/features/dashboard/components/Dashboard'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/login" element={<div>Login</div>} />
        <Route path="/dashboard" element={<DashboardLayout/>}>
            <Route index element={<Dashboard/>} />
            <Route path='teams' element={<div>Teams</div>} />
            <Route path='projects' element={<div>Projects</div>} />
            <Route path='schemas' element={<div>Schemas</div>} />
            <Route path='settings' element={<div>Settings</div>} />
        </Route>
        <Route path='annotation' element={<div>Annotation</div>} />
    </Routes>
  )
}

export default AppRoutes