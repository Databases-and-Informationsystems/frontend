<<<<<<< HEAD
import React from "react";
import Sidebar from "../components/Sidebar";  
import Settings from "../components/Settings";
/*import '../index.css';*/
=======
import React from 'react'
import { AppProvider } from './provider'
import AppRoutes from './routes'

>>>>>>> dashboard

const App: React.FC = () => {
  return (
<<<<<<< HEAD
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Settings />
    </div>
  );
};
=======
    <AppProvider>
      <AppRoutes/>
    </AppProvider>
  )
}
>>>>>>> dashboard

export default App;
