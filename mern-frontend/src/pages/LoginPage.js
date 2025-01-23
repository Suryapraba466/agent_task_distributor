import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import "../styles/LoginPage.css";

const LoginPage = () => {
  // State variables to hold email, password, error messages, and password visibility
  const [email, setEmail] = useState(""); // Stores the email input
  const [password, setPassword] = useState(""); // Stores the password input
  const [error, setError] = useState(""); // Stores error messages
  const [showPassword, setShowPassword] = useState(false); // Toggles password visibility
  const navigate = useNavigate(); // Hook for navigation after successful login

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior

    console.log("Email:", email); // Logs the email input for debugging
    console.log("Password length:", password.length); // Logs the length of the password for debugging

    try {
      // Sends POST request to login endpoint
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password } // Sends email and password as request payload
      );

      console.log("Response from login:", response); // Logs the response from the server
      localStorage.setItem("token", response.data.token); // Saves the token in localStorage for future use
      navigate("/dashboard"); // Redirects to the dashboard on successful login
    } catch (err) {
      console.log("Error response:", err.response); // Logs any errors from the login request
      // Sets an error message in case of failure
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Admin Login</h1>
        <form onSubmit={handleLogin}>
          {/* Email input field */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Updates email state on input change
              placeholder="Enter your email"
              required
            />
          </div>
          {/* Password input field with visibility toggle */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"} // Toggles input type based on showPassword state
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Updates password state on input change
                placeholder="Enter your password"
                required
              />
              {/* Button to toggle password visibility */}
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)} // Toggles the visibility state
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}{" "}
                {/* Shows Eye or EyeOff icon based on state */}
              </button>
            </div>
          </div>
          {/* Displays error message if there is an error */}
          {error && <p className="error-message">{error}</p>}
          {/* Submit button for logging in */}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
