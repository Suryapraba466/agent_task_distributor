import React, { useState, useRef } from "react";
import axios from "axios";
import "../styles/UploadList.css";
import {
  Upload,
  FileSpreadsheet,
  Users,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

// The UploadList component handles the file upload and displays the list of agents and their tasks.
const UploadList = () => {
  // State hooks for managing file, message, agents, and processing state
  const [file, setFile] = useState(null); // stores the uploaded file
  const [message, setMessage] = useState(""); // stores success/error messages
  const [agents, setAgents] = useState([]); // stores the list of agents and tasks
  const [isProcessing, setIsProcessing] = useState(false); // tracks if the file is being processed

  // Reference to the form element to reset after upload
  const formRef = useRef(null);

  // Handle file input change event
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile); // updates the state with the selected file
    }
  };

  // Handle file upload event when the form is submitted
  const handleFileUpload = async (e) => {
    e.preventDefault(); // prevents default form submission behavior
    if (!file) {
      setMessage("Please upload a CSV file.");
      return;
    }

    // Set loading state to indicate the processing is in progress
    setIsProcessing(true);
    setMessage("Processing your file...");

    const formData = new FormData(); // prepare the form data for file upload
    formData.append("file", file); // append the selected file to the form data

    try {
      // Send the file to the backend API for processing and distribution
      const response = await axios.post(
        "http://localhost:3000/api/upload/upload-distribute",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // specify the content type for file upload
          },
        }
      );

      // Log the response for debugging (check the structure of the response)
      console.log(response.data);

      // Set message and agents state based on the response from the backend
      setMessage(response.data.message);
      setAgents(response.data.agents);

      // Reset the form and file input after successful upload
      if (formRef.current) {
        formRef.current.reset();
      }
      setFile(null); // clear the file state
    } catch (error) {
      // Handle any error during the file upload
      setMessage("Error uploading file.");
    } finally {
      // Reset the processing state after file upload is complete (success or error)
      setIsProcessing(false);
    }
  };

  return (
    <div className="upload-list-container">
      <div className="upload-list-content">
        {/* Header section with icon and title */}
        <div className="header-wrapper">
          <div className="header-section">
            <FileSpreadsheet className="header-icon" size={32} />
            <div className="header-text">
              <h3>Upload Distributed List</h3>
              <p className="subheader">
                Upload and distribute tasks to your agents
              </p>
            </div>
          </div>
        </div>

        {/* File upload form */}
        <div className="upload-card">
          <form ref={formRef} onSubmit={handleFileUpload}>
            <div className="file-upload-wrapper">
              <Upload className="upload-icon" size={24} />
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
                className="file-input"
              />
            </div>
            {/* Upload button */}
            <button
              type="submit"
              disabled={isProcessing} // disable the button while processing
              className="upload-button"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Processing...
                </>
              ) : (
                <>
                  <Upload size={20} />
                  Upload CSV
                </>
              )}
            </button>
          </form>

          {/* Display success or error message */}
          {message && (
            <div className="message-container">
              {isProcessing ? (
                <Loader2 className="animate-spin message-icon" size={20} />
              ) : message.includes("Error") ? (
                <AlertCircle className="message-icon error" size={20} />
              ) : (
                <CheckCircle className="message-icon success" size={20} />
              )}
              <p>{message}</p>
            </div>
          )}
        </div>

        {/* Display the distributed list of agents if available */}
        {agents && agents.length > 0 && (
          <div className="agents-list">
            <div className="agents-header">
              <Users size={24} />
              <h3>Distributed List</h3>
            </div>
            <div className="agents-grid">
              {agents.map((agent, index) => (
                <div key={index} className="agent-card">
                  <h4>
                    <Users className="agent-icon" size={20} />
                    Agent: {agent.agentName}
                  </h4>
                  <ul>
                    {/* Display tasks assigned to the agent */}
                    {agent.tasks && agent.tasks.length > 0 ? (
                      agent.tasks.map((task, i) => (
                        <li key={i}>
                          <span className="task-number">Task {i + 1}</span>
                          <div className="task-details">
                            <strong>{task.firstName}</strong>
                            <span>Phone: {task.phone}</span>
                            <span>Notes: {task.notes}</span>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="no-tasks">No items assigned</li> // Display if no tasks are assigned
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadList;
