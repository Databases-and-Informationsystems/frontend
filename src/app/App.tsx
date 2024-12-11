import React from "react";
import Sidebar from "../components/Sidebar";  
import Settings from "../components/Settings";
/*import '../index.css';*/

const App: React.FC = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Settings />
    </div>
  );
};

export default App;
