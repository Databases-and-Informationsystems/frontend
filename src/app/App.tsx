import React from 'react'
import '../App.css'
import { AppProvider } from './provider'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ThemeToggle/ThemeToggle'

function App() {
  return (
    <AppProvider>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Testing
      </h1>
      <Button>Click Me</Button>
      <ModeToggle />
    </AppProvider>
  )
}

export default App
