import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faTachometerAlt, 
  faProjectDiagram, 
  faDatabase, 
  faUsers, 
  faSignOutAlt, 
  faUserCircle 
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div>
        <div className="sidebar-item">
          <FontAwesomeIcon icon={faTachometerAlt} className="sidebar-icon" /> <span className="sidebar-text">Dashboard</span>
        </div>
        <div className="sidebar-item">
          <FontAwesomeIcon icon={faProjectDiagram} className="sidebar-icon" /> <span className="sidebar-text">Projects</span>
        </div>
        <div className="sidebar-item">
          <FontAwesomeIcon icon={faDatabase} className="sidebar-icon" /> <span className="sidebar-text">Schemas</span>
        </div>
        <div className="sidebar-item">
          <FontAwesomeIcon icon={faUsers} className="sidebar-icon" /> <span className="sidebar-text">Teams</span>
        </div>
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-item">
          <FontAwesomeIcon icon={faSignOutAlt} className="sidebar-icon" /> <span className="sidebar-text">Log out</span>
        </div>
        <div className="sidebar-item">
          <FontAwesomeIcon icon={faUserCircle} className="sidebar-icon" /> <span className="sidebar-text">User Profile</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
