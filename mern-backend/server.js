// Importing required dependencies
const express = require("express"); // Web framework for Node.js
const dotenv = require("dotenv"); // To load environment variables
const cors = require("cors"); // Middleware to enable Cross-Origin Resource Sharing
const bodyParser = require("body-parser"); // Middleware to parse incoming request bodies
const connectDB = require("./config/db"); // Function to connect to the database

const authRoutes = require("./routes/authRoutes"); // Routes for user authentication
const agentRoutes = require("./routes/agentRoutes"); // Routes for agent management
const uploadRoutes = require("./routes/uploadRoutes"); // Routes for file upload and task distribution

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

// Initialize express application
const app = express();

// Middleware setup
app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json()); // Parse incoming JSON request bodies

// Define route handlers for the application
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/agents", agentRoutes); // Agent management routes
app.use("/api/upload", uploadRoutes); // File upload and task distribution routes

// Set up server to listen on a specified port (either from environment or default 3000)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Start the server
