const express = require("express"); // Import express module
const router = express.Router(); // Create a new router instance
const { uploadAndDistributeList } = require("../controllers/uploadController"); // Import the controller to handle file upload and task distribution

// Route to handle CSV file upload and distribute tasks to agents
// When a POST request is made to '/upload-distribute', it triggers the uploadAndDistributeList function from the controller
router.post("/upload-distribute", uploadAndDistributeList);

module.exports = router; // Export the router to be used in the main server file
