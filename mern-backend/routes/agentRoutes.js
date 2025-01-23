const express = require("express");
const { addAgent, getAllAgents } = require("../controllers/agentController");
const router = express.Router(); // Create a new router instance

// Route for adding a new agent
// This route will trigger the addAgent controller to create a new agent
router.post("/add", addAgent);

// Route for fetching all agents
// This route will trigger the getAllAgents controller to fetch and return a list of all agents
router.get("/", getAllAgents);

module.exports = router; // Export the router to be used in the main server file
