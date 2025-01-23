const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/userModel"); // Assuming your model is in the 'models' folder
const connectDB = require("./config/db"); // Adjust the path according to your project structure

// Function to create the admin user
const createAdmin = async () => {
  await connectDB(); // Make sure MongoDB connection is established

  const adminEmail = "admin@example.com"; // Admin's email
  const adminPassword = "admin123"; // Admin's password

  try {
    // Check if admin already exists
    const adminExists = await User.findOne({ email: adminEmail });
    if (adminExists) {
      console.log("Admin already exists.");
      return;
    }

    // Create a new admin user
    const admin = new User({
      email: adminEmail,
      password: adminPassword,
      role: "admin",
    });

    // Save the user
    await admin.save();
    console.log("Admin created successfully!");
  } catch (error) {
    console.error(`Error creating admin: ${error.message}`);
  } finally {
    mongoose.connection.close(); // Close the DB connection after operation
  }
};

// Run the script
createAdmin();
