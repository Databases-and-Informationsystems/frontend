import React from 'react'
import '../App.css'
import { AppProvider } from './provider'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ThemeToggle/ThemeToggle'
import { NavigationHeader } from '@/features/annotation_tool/components/navigation-header.tsx'

function App() {
  return (
    <AppProvider>
      <NavigationHeader project_name={"project_name"} />
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Testing
      </h1>
      <Button>Click Me</Button>
      <ModeToggle />
    </AppProvider>
  )
}

export default App
