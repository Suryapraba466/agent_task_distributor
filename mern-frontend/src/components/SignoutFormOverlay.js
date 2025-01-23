import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation
import { LogOut, X, Check } from "lucide-react"; // Import icons for signout overlay
import "../styles/SignoutFormOverlay.css"; // Import custom CSS for the overlay

const SignoutFormOverlay = ({ isOpen, onClose }) => {
  const navigate = useNavigate(); // Navigate hook for page redirection

  // Handle sign out logic
  const handleSignout = () => {
    // Clear authentication token (localStorage is used for example)
    localStorage.removeItem("token");

    // Redirect to the homepage
    navigate("/");

    // Close the overlay after sign out
    onClose();
  };

  // If the overlay is not open, return null to hide the component
  if (!isOpen) return null;

  return (
    <div className="signout-overlay">
      <div className="signout-modal">
        {/* Header of the signout modal */}
        <div className="signout-header">
          <LogOut className="signout-icon" size={24} />
          <h2>Sign Out</h2>
        </div>

        {/* Confirmation message */}
        <p>Are you sure you want to sign out?</p>

        {/* Buttons for confirming or canceling sign out */}
        <div className="signout-buttons">
          {/* Confirm button */}
          <button className="confirm-button" onClick={handleSignout}>
            <Check size={20} />
            Yes, Sign Out
          </button>

          {/* Cancel button */}
          <button className="cancel-button" onClick={onClose}>
            <X size={20} />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignoutFormOverlay;
