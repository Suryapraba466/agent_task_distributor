import React, { useState } from "react";
import Sidebar from "../components/Sidebar"; // Import Sidebar component
import "../styles/Dashboard.css"; // Import custom CSS for the dashboard

const Dashboard = () => {
  // State to track the active menu item
  const [activeMenu, setActiveMenu] = useState("overview");

  return (
    <div className="dashboard-container">
      {/* Sidebar Component - Contains navigation links */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="content">
        {/* Conditionally render content based on active menu */}
        {activeMenu === "overview" && (
          <div className="overview">
            <h3>Dashboard Overview</h3>
            <p>
              Welcome to the admin dashboard. Here you can manage agents, upload
              files, and more.
            </p>
          </div>
        )}
        {activeMenu === "agents" && (
          <div className="agents">
            <h3>Agent Management</h3>
            <p>Manage your agents here.</p>
          </div>
        )}
        {activeMenu === "upload" && (
          <div className="upload">
            <h3>Upload Distributed List</h3>
            <p>Upload CSV files and distribute tasks to agents.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
