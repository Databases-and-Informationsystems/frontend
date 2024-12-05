import { ModeToggle } from '@/components/ThemeToggle/ThemeToggle'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import { PanelsTopLeft, FolderKanban, Users, SwatchBook, Settings } from 'lucide-react'
import { Link } from 'react-router'


const sideBarItems = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: PanelsTopLeft,
  },
  {
    title: "Projects",
    url: "/dashboard/projects",
    icon: FolderKanban,
  },
  {
    title: "Teams",
    url: "/dashboard/teams",
    icon: Users,
  },
  {
    title: "Schema",
    url: "/dashboard/schemas",
    icon: SwatchBook,
  }
]

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();


  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size='lg'>
              <span className={`text-4xl font-semibold ${
                  state === 'collapsed' ? 'hidden' : 'block'
                }`}>
                Application
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {sideBarItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild size='lg' className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <Link to={item.url}>
                    <div>
                      <item.icon size={32} />
                    </div>
                    <span className='text-2xl font-semibold'>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size='lg' className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <Link to="/dashboard/settings">
                <div>
                  <Settings size={32} />
                </div>
                <span className='text-2xl font-semibold'>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size='lg'>
              <div className='justify-self-start'>
              <ModeToggle />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}