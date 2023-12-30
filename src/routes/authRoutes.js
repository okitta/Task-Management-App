const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// User registration route
router.post(
  "/register",
  authController.validateUserRegistration,
  authController.registerUser
);

// User login route
router.post("/login", authController.loginUser);

module.exports = router;
