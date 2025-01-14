import React from 'react'
import { AppProvider } from './provider'
import AppRoutes from './routes'
import EntitySelection from '@/features/annotation_tool/components/EntitySelection.tsx'
import { MentionProvider } from '@/features/annotation_tool/provider/MentionProvider.tsx'


function App() {
  return (
    <AppProvider>
      <div style={{height:"42px"}}></div>
      {/*<MentionProvider>
        <EntitySelection></EntitySelection>
      </MentionProvider>*/}
      <AppRoutes/>
    </AppProvider>
  )
}

export default App
