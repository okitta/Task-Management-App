const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const profileController = require("../controllers/profileController");

// Fetch user profile route
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  profileController.getUserProfile
);

module.exports = router;
