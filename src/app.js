const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// Test route
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// Export the Express app instance
module.exports = app;
