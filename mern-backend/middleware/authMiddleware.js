const jwt = require("jsonwebtoken"); // Import jwt for token verification

// Middleware function to protect routes requiring authentication
const protect = (req, res, next) => {
  // Extract the token from the Authorization header (e.g., "Bearer <token>")
  const token = req.headers.authorization?.split(" ")[1];

  // If no token is found, return an error response
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    // Verify the token using the JWT secret from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user data (e.g., user ID, role) to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If token verification fails, return an error response
    res.status(401).json({ message: "Token failed" });
  }
};

module.exports = protect; // Export the middleware function for use in other parts of the application
