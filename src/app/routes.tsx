import React from 'react'
import { Routes, Route } from 'react-router'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/login" element={<div>Login</div>} />
        <Route path="/dashboard" element={<div>Dashboard</div>}>
            <Route path='overview' element={<div>Overview</div>} />
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