import { AnnotationLayout } from '@/features/annotation_tool/components/AnnotationLayout'
import DashboardLayout from '@/features/dashboard/components/DashboardLayout'
import React from 'react'
import { Routes, Route } from 'react-router'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/login" element={<div>Login</div>} />
        <Route path="/dashboard" element={<DashboardLayout/>}>
            <Route index element={<div>Overview</div>} />
            <Route path='teams' element={<div>Teams</div>} />
            <Route path='projects' element={<div>Projects</div>} />
            <Route path='schemas' element={<div>Schemas</div>} />
            <Route path='settings' element={<div>Settings</div>} />
        </Route>
        <Route path='annotation' element={<AnnotationLayout/>} />
    </Routes>
  )
}

export default AppRoutes