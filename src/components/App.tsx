/*import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Sidebar from "./Sidebar"; 
import Settings from "./Settings"; 
import './index.css'; 

const App: React.FC = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Settings />
    </div>
  );
};

export default App;*/
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Settings from "../components/Settings";
import Login from "../components/Login";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Route for Login */}
        <Route path="/" element={<Login />} />

        {/* Route for Settings with Sidebar */}
        <Route
          path="/settings"
          element={
            <div style={{ display: "flex", height: "100vh" }}>
              <Sidebar />
              <Settings />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

