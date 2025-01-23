// Import required dependencies
const mongoose = require("mongoose");
require("dotenv").config();

/**
 * Establishes connection to MongoDB database
 * Uses environment variables for connection string
 */
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB with configuration options
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // Use new URL parser
      useUnifiedTopology: true, // Use new Server Discover and Monitoring engine
    });

    // Log successful connection
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log any connection errors and exit process
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit with failure code
  }
};

// Export the connection function
module.exports = connectDB;
