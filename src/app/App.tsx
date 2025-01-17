/*import React from "react";
import Sidebar from "../components/Sidebar";  
import Settings from "../features/dashboard/components/Settings";
/*import '../index.css';*/

/*const App: React.FC = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Settings />
    </div>
  );
};

export default App;*/
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/features/dashboard/components/AppSidebar';
import Login from '@/features/login/pages/Login';
import Settings from '@/features/dashboard/Settings/Settings';
import Teams from '@/features/dashboard/Teams/Teams';

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
