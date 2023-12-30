const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

// Fetch a specific task by ID route
router.get(
  "/:taskId",
  authMiddleware,
  roleMiddleware("admin"),
  taskController.getTaskById
);

// Update a specific task by ID route
router.put(
  "/:taskId",
  authMiddleware,
  roleMiddleware("admin"),
  taskController.updateTaskById
);

// Delete a specific task by ID route
router.delete(
  "/:taskId",
  authMiddleware,
  roleMiddleware("admin"),
  taskController.deleteTaskById
);

module.exports = router;
