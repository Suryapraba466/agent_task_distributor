const mongoose = require("mongoose");

// Define the schema for the Agent model
const agentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Name of the agent (required field)
    },
    email: {
      type: String,
      required: true,
      unique: true, // Email must be unique for each agent
    },
    mobile: {
      type: String,
      required: true, // Mobile number (required field)
    },
    password: {
      type: String,
      required: true, // Password for the agent (required field)
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ], // Array of references to tasks assigned to the agent
  },
  { timestamps: true } // Adds createdAt and updatedAt fields to the schema
);

// Create and export the Agent model based on the schema
const Agent = mongoose.model("Agent", agentSchema);

module.exports = Agent; // Export the Agent model to use in other parts of the application
