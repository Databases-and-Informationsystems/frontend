import { Sidebar, SidebarContent, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { PanelsTopLeft, FolderKanban, Users, SwatchBook  } from 'lucide-react'
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

export default function AppSidebar() {
  return (
    <Sidebar>
        <SidebarContent>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sideBarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarContent>
    </Sidebar>
  )
}