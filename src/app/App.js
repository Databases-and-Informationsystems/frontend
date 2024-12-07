import React from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard"; 
import "./app/App.css"; 

const App = () => {
  return (
    <div className="app">
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default App;
