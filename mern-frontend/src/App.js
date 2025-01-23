// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./components/DashboardLayout"; // Import the layout
import Dashboard from "./components/Dashboard";
import AgentManagement from "./components/AgentManagement";
import UploadList from "./components/UploadList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        {/* Dashboard Layout with sidebar always visible */}
        <Route
          path="/dashboard/*"
          element={
            <DashboardLayout>
              <Routes>
                <Route path="" element={<Dashboard />} />
                <Route path="agents" element={<AgentManagement />} />
                <Route path="upload" element={<UploadList />} />
              </Routes>
            </DashboardLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
