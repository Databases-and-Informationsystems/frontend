import React from 'react'
import { AppProvider } from './provider'
import AppRoutes from './routes'
import { Toaster } from '@/components/ui/sonner'


function App() {
  return (
    <AppProvider>
      {/*<div style={{height:"42px"}}></div>
      {/*<MentionProvider>
        <EntitySelection></EntitySelection>
      </MentionProvider>*/}
      <AppRoutes/>
      <Toaster position="top-center" richColors/>
    </AppProvider>
  )
}

export default App
