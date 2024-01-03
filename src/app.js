const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// load html file to test the socket connection
app.use(express.static("public"));

// Authentication routes
app.use("/api/auth", authRoutes);

// Project routes
app.use("/api/projects", projectRoutes);

// Task routes
app.use("/api/tasks", taskRoutes);

// Profile routes
app.use("/api/profile", profileRoutes);

// Export the Express app instance
module.exports = { app };
