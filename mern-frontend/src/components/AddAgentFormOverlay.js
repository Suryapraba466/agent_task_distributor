import React from "react";
import { UserPlus, Mail, Phone, Lock } from "lucide-react";
import PhoneInput from "react-phone-number-input";

// AddAgentFormOverlay component handles the display and submission of a new agent form
const AddAgentFormOverlay = ({
  isOpen, // Determines if the overlay is visible
  onClose, // Function to close the overlay
  name, // Current name value
  email, // Current email value
  mobile, // Current mobile number value
  password, // Current password value
  setName, // Function to update the name state
  setEmail, // Function to update the email state
  setMobile, // Function to update the mobile state
  setPassword, // Function to update the password state
  handleAddAgent, // Function to handle agent addition
}) => {
  // If the overlay is not open, return null to avoid rendering
  if (!isOpen) return null;

  // Handle form submission
  const handleSubmit = (e) => {
    handleAddAgent(e); // Calls the function to add the agent
    onClose(); // Closes the form overlay after submission
  };

  return (
    <div className="form-overlay">
      <div className="form-overlay-content">
        {/* Close button */}
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h3>Add New Agent</h3>
        <form onSubmit={handleSubmit}>
          {/* Input field for Name */}
          <div className="input-group">
            <UserPlus className="input-icon" />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)} // Updates name state
              required
            />
          </div>
          {/* Input field for Email */}
          <div className="input-group">
            <Mail className="input-icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Updates email state
              required
            />
          </div>
          {/* Phone input field with react-phone-number-input */}
          <div className="input-group phone-input">
            <Phone className="input-icon" />
            <PhoneInput
              international // Allows international phone numbers
              defaultCountry="IN" // Sets default country to India
              value={mobile}
              onChange={setMobile} // Updates mobile number state
              placeholder="Enter mobile number"
            />
          </div>
          {/* Input field for Password */}
          <div className="input-group">
            <Lock className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Updates password state
              required
            />
          </div>
          {/* Submit button to save agent */}
          <button type="submit">Save Agent</button>
        </form>
      </div>
    </div>
  );
};

export default AddAgentFormOverlay;
