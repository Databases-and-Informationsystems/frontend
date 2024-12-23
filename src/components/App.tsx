import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupAction, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider, 
  SidebarHeader 
} from "../components/ui/sidebar"; // Import all Sidebar components
import Settings from '../components/Settings'; // Import Settings page
import Login from '../components/Login'; // Import Login page
import Teams from '../components/Teams'; // Import Teams page

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Login page without sidebar */}
        <Route path="/" element={<Login />} />
        
        {/* Route for Settings page with sidebar */}
        <Route
          path="/settings"
          element={
            <SidebarProvider>
              <div style={{ display: 'flex', height: '100vh' }}>
                {/* Sidebar */}
                <Sidebar style={{ width: '250px', backgroundColor: '#f4f4f4' }}>
                  <SidebarContent>
                    <SidebarHeader>Logo + Name</SidebarHeader>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton>Dashboard</SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>Projects</SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>Schemas</SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>Teams</SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                    <SidebarFooter>
                      <SidebarGroup>
                        <SidebarGroupAction>
                          <SidebarMenuButton>Log Out</SidebarMenuButton>
                        </SidebarGroupAction>
                       
                      </SidebarGroup>
                    </SidebarFooter>
                  </SidebarContent>
                </Sidebar>
                <div style={{ flex: 1, padding: '20px' }}>
                  <Settings />
                </div>
              </div>
            </SidebarProvider>
          }
        />
        
        {/* Route for Teams page with sidebar */}
        <Route
          path="/teams"
          element={
            <SidebarProvider>
              <div style={{ display: 'flex', height: '100vh' }}>
                {/* Sidebar */}
                <Sidebar style={{ width: '250px', backgroundColor: '#f4f4f4' }}>
                  <SidebarContent>
                    <SidebarHeader>Logo + Name</SidebarHeader>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton>Dashboard</SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>Projects</SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>Schemas</SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>Teams</SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                    <SidebarFooter>
                      <SidebarGroup>
                        <SidebarGroupAction>
                          <SidebarMenuButton>Log Out</SidebarMenuButton>
                        </SidebarGroupAction>
                        <SidebarGroupAction>
                          <SidebarMenuButton>User Profile</SidebarMenuButton>
                        </SidebarGroupAction>
                      </SidebarGroup>
                    </SidebarFooter>
                  </SidebarContent>
                </Sidebar>
                <div style={{ flex: 1, padding: '20px' }}>
                  <Teams />
                </div>
              </div>
            </SidebarProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;







