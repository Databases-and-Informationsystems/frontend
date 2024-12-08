import React, { useState } from "react";
import "./Sidebar.css"; 
import "@fontsource/inter"; 

const Sidebar: React.FC = () => {
  const [isExpanded, setExpendState] = useState(true);

  // Menu items with icons
  const menuItems = [
    {
      text: "Dashboard",
      icon: require("./icons/dashboard.png"), 
      href: "/dashboard", 
    },
    {
      text: "Projects",
      icon: require("./icons/project-management.png"), 
      href: "/dashboard", 
    },
    {
      text: "Schema",
      icon: require("./icons/scheme.png"), 
      href: "/schema", 
    },
    {
      text: "Teams",
      icon: require("./icons/group-chat.png"), 
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
