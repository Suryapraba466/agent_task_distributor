const express = require("express");
const { loginUser } = require("../controllers/authController"); // Import loginUser controller from authController
const router = express.Router(); // Create a new router instance

// Route for logging in a user
// This route triggers the loginUser controller to handle user login
router.post("/login", loginUser);

module.exports = router; // Export the router so it can be used in the main server file
