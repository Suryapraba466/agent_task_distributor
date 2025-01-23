const User = require("../models/userModel"); // Importing the User model for user-related operations
const jwt = require("jsonwebtoken"); // Importing JSON Web Token library for generating tokens
const bcrypt = require("bcryptjs"); // Importing bcrypt for comparing hashed passwords

// Controller method to log in a user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body; // Destructuring email and password from request body

  // Log the login attempt for debugging
  console.log("Login attempt with email:", email);
  console.log("Login attempt with password:", password);

  // Validate if email and password are provided
  if (!email || !password) {
    console.log("Email or password missing.");
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      // If user not found, log and return error response
      console.log("User not found with email:", email);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Log the stored hashed password from the database (for debugging purposes)
    console.log("Stored hashed password:", user.password);

    // Compare the entered password with the stored hashed password
    const isPasswordMatch = await bcrypt.compare(
      password.trim(),
      user.password.trim()
    );

    // Log the entered password and lengths (for debugging purposes)
    console.log("Password entered:", password);
    console.log("Length of entered password:", password.length);
    console.log("Stored hashed password length:", user.password.length);

    console.log("Password match:", isPasswordMatch); // Log whether the password matches

    if (!isPasswordMatch) {
      // If password doesn't match, log and return error response
      console.log("Password mismatch for user:", email);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token for the logged-in user, with userId and role
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET, // JWT secret key from environment variables
      {
        expiresIn: "1h", // Token expiration time
      }
    );

    // Log the generated JWT token (for debugging purposes)
    console.log("JWT token generated:", token);

    // Respond with a success message and the generated token
    return res.status(200).json({
      message: "Login successful",
      token, // Sending the generated token to the client
    });
  } catch (error) {
    // Log error if something goes wrong during the login process
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" }); // Internal server error response
  }
};
