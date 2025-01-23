const mongoose = require("mongoose");

// Define the schema for the Task model
const taskSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true, // First name of the person associated with the task (required field)
  },
  phone: {
    type: String,
    required: true, // Phone number of the person associated with the task (required field)
  },
  notes: {
    type: String,
    // Additional notes related to the task (optional field)
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent", // Reference to the Agent model, indicating which agent is assigned the task
    required: true, // This field is required
  },
});

// Create and export the Task model based on the schema
module.exports = mongoose.model("Task", taskSchema);
