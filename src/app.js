const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const profileRoutes = require("./routes/profileRoutes");

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// load html file to test the socket connection
app.use(express.static("public"));

// Set io as a property of the app
app.set("socketio", io);

// Authentication routes
app.use("/api/auth", authRoutes);

// Project routes
app.use("/api/projects", projectRoutes);

// Task routes
app.use("/api/tasks", taskRoutes);

// Profile routes
app.use("/api/profile", profileRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the Express app instance
module.exports = { app };
