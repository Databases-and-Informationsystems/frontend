import React from 'react'
import '../App.css'
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
