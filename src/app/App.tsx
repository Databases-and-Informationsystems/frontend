import React from 'react'
import { AppProvider } from './provider'
import AppRoutes from './routes'
import EntitySelection from '@/features/annotation_tool/components/EntitySelection.tsx'


function App() {
  return (
    <AppProvider>
      <div style={{height:"42px"}}></div>
      <EntitySelection></EntitySelection>
      <AppRoutes/>
    </AppProvider>
  )
}

export default App
