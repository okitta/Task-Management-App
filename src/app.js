const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// Test route
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// Authentication routes
app.use("/api/auth", authRoutes);

// Project routes
app.use("/api/projects", projectRoutes);

// Export the Express app instance
module.exports = app;
