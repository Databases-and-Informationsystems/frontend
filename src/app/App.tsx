import React from 'react'
import { AppProvider } from './provider'
import AppRoutes from './routes'


function App() {
  return (
    <AppProvider>
      <AppRoutes/>
    </AppProvider>
  )
}

export default App
