import React, { useState } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink for navigation
import { LayoutDashboard, Users, Upload, LogOut } from "lucide-react"; // Import icons for sidebar
import SignoutFormOverlay from "./SignoutFormOverlay"; // Import Signout overlay component
import "../styles/Sidebar.css"; // Import custom CSS for the sidebar

const Sidebar = () => {
  // State to manage the visibility of the signout overlay
  const [isSignoutOpen, setIsSignoutOpen] = useState(false);

  return (
    <div className="sidebar">
      {/* Sidebar Header */}
      <h2>Admin Panel</h2>

      <nav>
        {/* Dashboard link - Navigates to the main dashboard page */}
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) => (isActive ? "active" : "")} // Active link styling
        >
          <LayoutDashboard className="sidebar-icon" size={24} />
          <span className="sidebar-text">Dashboard</span>
        </NavLink>

        {/* Agent Management link */}
        <NavLink
          to="/dashboard/agents"
          className={({ isActive }) => (isActive ? "active" : "")} // Active link styling
        >
          <Users className="sidebar-icon" size={24} />
          <span className="sidebar-text">Agent Management</span>
        </NavLink>

        {/* Upload Distributed List link */}
        <NavLink
          to="/dashboard/upload"
          className={({ isActive }) => (isActive ? "active" : "")} // Active link styling
        >
          <Upload className="sidebar-icon" size={24} />
          <span className="sidebar-text">Upload Distributed List</span>
        </NavLink>
      </nav>

      {/* Sign Out button - Opens the signout confirmation overlay */}
      <button className="signout-button" onClick={() => setIsSignoutOpen(true)}>
        <LogOut className="sidebar-icon" size={24} />
        <span className="sidebar-text">Sign Out</span>
      </button>

      {/* Signout Form Overlay - Triggered by clicking sign out */}
      <SignoutFormOverlay
        isOpen={isSignoutOpen}
        onClose={() => setIsSignoutOpen(false)}
      />
    </div>
  );
};

export default Sidebar;
