const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true, // The email field is required
    unique: true, // The email should be unique across the collection
    trim: true, // Trims any extra spaces from the email
  },
  password: {
    type: String,
    required: true, // The password field is required
  },
  role: {
    type: String,
    default: "admin", // Default role is set to 'admin' for now
  },
});

// Password hashing middleware: Runs before saving the user
userSchema.pre("save", async function (next) {
  // Check if the password is modified before applying hashing
  if (!this.isModified("password")) {
    return next(); // Skip the password hashing if not modified
  }

  // Generate a salt to hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); // Hash the password
  next(); // Proceed to save the user after hashing
});

// Method to compare entered password with the hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  // Compare the entered password with the hashed password stored in DB
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export the User model based on the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
