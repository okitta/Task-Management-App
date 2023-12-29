const jwt = require("jsonwebtoken");
require("dotenv").config();

function authMiddleware(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET_KEY); // Extract the token from the "Bearer" prefix
    req.user = decoded; // Set the decoded user information in the request object
    next(); // Continue to the next middleware or route
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
}

module.exports = authMiddleware;
