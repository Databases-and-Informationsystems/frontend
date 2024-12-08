import React from "react";
import Sidebar from "./Sidebar"; 
import Settings from "./Settings"; 

const App: React.FC = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Settings />
    </div>
  );
};

export default App;
