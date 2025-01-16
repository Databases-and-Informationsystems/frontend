import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import Login from '@/components/Login';
import Settings from '@/components/Settings';
import Teams from '@/components/Teams';

// Wrapper to manage layout based on route
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  // Define routes where the sidebar should be hidden
  const noSidebarRoutes = ['/'];

  const shouldShowSidebar = !noSidebarRoutes.includes(location.pathname);

  return (
    <div className="flex h-screen">
      {shouldShowSidebar && <AppSidebar />}
      <div className="flex-1">{children}</div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <SidebarProvider>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/teams" element={<Teams />} />
          </Routes>
        </AppLayout>
      </SidebarProvider>
    </Router>
  );
}

export default App;
