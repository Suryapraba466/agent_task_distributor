const bcrypt = require("bcryptjs");
const Agent = require("../models/agentModel");
const validator = require("validator"); // Importing the validator module for input validation

// Add a new agent
exports.addAgent = async (req, res) => {
  const { name, email, mobile, password } = req.body; // Destructuring required fields from request body

  try {
    // Input validation: Ensure all required fields are provided
    if (!name || !email || !mobile || !password) {
      console.log("Missing required fields:", {
        name,
        email,
        mobile,
        password,
      });
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate email format using validator
    if (!validator.isEmail(email)) {
      console.log("Invalid email format:", email);
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Validate mobile number format using a regular expression
    const mobilePattern = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    if (!mobilePattern.test(mobile)) {
      console.log("Invalid mobile number format:", mobile);
      return res.status(400).json({ message: "Invalid mobile number format" });
    }

    // Check if agent with the given email already exists
    console.log("Checking for existing agent with email:", email);
    const existingAgent = await Agent.findOne({ email });
    if (existingAgent) {
      console.log("Agent already exists:", existingAgent);
      return res.status(400).json({ message: "Agent already exists" });
    }

    // Hash the password using bcrypt for security
    console.log("Hashing password for agent:", email);
    const hashedPassword = await bcrypt.hash(password, 10); // Hashing password with salt rounds of 10

    // Create a new agent object with validated and hashed data
    const newAgent = new Agent({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    // Save the new agent to the database
    console.log("Saving new agent to database:", newAgent);
    await newAgent.save();

    // Respond with success message
    res.status(201).json({ message: "Agent created successfully" });
  } catch (error) {
    // Handle any errors that may occur during the process
    console.error("Error creating agent:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Fetch all agents
exports.getAllAgents = async (req, res) => {
  try {
    console.log("Fetching all agents from database...");
    const agents = await Agent.find(); // Retrieve all agents from the database
    console.log("Agents fetched:", agents);

    // Respond with the list of agents
    res.status(200).json(agents);
  } catch (error) {
    // Handle any errors that may occur during the fetching process
    console.error("Error fetching agents:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
