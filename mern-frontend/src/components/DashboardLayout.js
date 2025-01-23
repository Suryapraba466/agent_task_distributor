// DashboardLayout.js
import React from "react";
import Sidebar from "../components/Sidebar"; // Import the Sidebar component
import "../styles/DashboardLayout.css"; // Import custom CSS for the layout

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      {/* Sidebar - Navigation menu for the dashboard */}
      <Sidebar />

      {/* Main Content Area - Displays the content passed as children */}
      <div className="dashboard-layout-content">{children}</div>
    </div>
  );
};

export default DashboardLayout;
