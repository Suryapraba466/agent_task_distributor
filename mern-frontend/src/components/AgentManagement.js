import React, { useState, useEffect } from "react";
import axios from "axios";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Import phone input style
import "../styles/AgentManagement.css"; // Custom styles for Agent Management
import { UserPlus, Mail, Phone, Lock, Users } from "lucide-react"; // Icons from lucide-react
import AddAgentFormOverlay from "../components/AddAgentFormOverlay"; // Component for agent form overlay

const AgentManagement = () => {
  // State variables for agent list and form inputs
  const [agents, setAgents] = useState([]); // List of agents
  const [name, setName] = useState(""); // Name of the new agent
  const [email, setEmail] = useState(""); // Email of the new agent
  const [mobile, setMobile] = useState(""); // Mobile number of the new agent
  const [password, setPassword] = useState(""); // Password for the new agent
  const [isFormOpen, setIsFormOpen] = useState(false); // State for managing the form visibility

  // Fetch all agents when the component mounts
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/agents"); // API request to fetch agents
        setAgents(response.data); // Set the agents state with fetched data
      } catch (error) {
        console.error("Error fetching agents:", error); // Log any errors in fetching agents
      }
    };
    fetchAgents(); // Call fetchAgents function
  }, []); // Empty dependency array to run only once on component mount

  // Handle adding a new agent
  const handleAddAgent = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate that all fields are filled
    if (!name || !email || !mobile || !password) {
      alert("All fields are required"); // Alert user if any field is missing
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/agents/add", // API endpoint to add a new agent
        {
          name,
          email,
          mobile,
          password,
        }
      );
      alert(response.data.message); // Show success message
      // Refresh the agent list after adding the new agent
      setAgents([...agents, { name, email, mobile }]);
      // Reset form fields
      setName("");
      setEmail("");
      setMobile("");
      setPassword("");
    } catch (error) {
      alert("Error adding agent."); // Show error message if the request fails
    }
  };

  return (
    <div className="agent-management-container">
      <div className="agent-content">
        <div className="header-wrapper">
          <div className="header-section">
            <UserPlus className="header-icon" size={32} />{" "}
            {/* Icon for header */}
            <div className="header-text">
              <h3>Agent Management</h3>
              <p className="subheader">
                Manage your team members and their accounts
              </p>
            </div>
          </div>
          {/* Button to open the Add Agent form */}
          <button className="add-agent-btn" onClick={() => setIsFormOpen(true)}>
            <UserPlus size={20} /> {/* Icon for the button */}
            Add Agent
          </button>
        </div>

        {/* AddAgentFormOverlay component is displayed when the form is open */}
        <AddAgentFormOverlay
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)} // Close the form
          name={name}
          email={email}
          mobile={mobile}
          password={password}
          setName={setName} // Pass setter functions to the form
          setEmail={setEmail}
          setMobile={setMobile}
          setPassword={setPassword}
          handleAddAgent={handleAddAgent} // Handle the form submission
        />

        <div className="agents-section">
          <h3>Agents List</h3>
          {/* Display list of agents */}
          <ul className="agents-grid">
            {agents.map((agent) => (
              <li key={agent._id} className="agent-card">
                <div className="agent-info">
                  <UserPlus className="agent-icon" />
                  {/* Display agent details */}
                  <div>
                    <strong>Name:</strong> {agent.name}
                  </div>
                  <div>
                    <strong>Email:</strong> {agent.email}
                  </div>
                  <div>
                    <strong>Mobile:</strong> {agent.mobile}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AgentManagement;
