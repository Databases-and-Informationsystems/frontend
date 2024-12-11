import React, { useState } from "react";
import "./Sidebar.css"; 
/*import "@fontsource/inter"; */
import dashboardIcon from "./icons/dashboard.png";
import projectIcon from "./icons/project-management.png";
import schemaIcon from "./icons/scheme.png";
import teamsIcon from "./icons/group-chat.png";
const Sidebar: React.FC = () => {
  const [isExpanded, setExpendState] = useState(true);

  const menuItems = [
    {
      text: "Dashboard",
      icon: dashboardIcon, 
            href: "/dashboard", 
    },
    {
      text: "Projects",
      icon: projectIcon, 
            href: "/dashboard", 
    },
    {
      text: "Schema",
      icon: schemaIcon,  
            href: "/schema", 
    },
    {
      text: "Teams",
      icon: teamsIcon,
            href: "/dashboard", 
    },
  ];

  return (
    <div className={`sidebar ${isExpanded ? "expanded" : ""}`}>
      <div className="sidebar-header">
        <h2>Logo + Name</h2>
      </div>
      <div className="sidebar-menu">
        {menuItems.map((item, index) => (
          <a className="menu-item" key={index} href={item.href}>
            <img src={item.icon} alt={`${item.text} icon`} className="menu-icon" />
            <span className="text">{item.text}</span>
          </a>
        ))}
      </div>
      <div className="sidebar-footer">
        <p>User: </p>
        <p>Email: </p>
      </div>
    </div>
  );
};

export default Sidebar;
