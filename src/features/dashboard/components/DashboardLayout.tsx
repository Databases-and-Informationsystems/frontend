import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import AppSidebar from './AppSidebar'
import { Outlet } from 'react-router'

export default function DashboardLayout() {
  return (
    <SidebarProvider>
        <AppSidebar />
        <main>
            <SidebarTrigger />
            <Outlet />
        </main>
    </SidebarProvider>
  )
}