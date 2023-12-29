const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const authMiddleware = require("../middlewares/authMiddleware");

// Fetch all projects route
router.get("/", authMiddleware, projectController.getAllProjects);

// Create a new project route
router.post("/", authMiddleware, projectController.createProject);

// Fetch a specific project by ID route
router.get("/:projectId", authMiddleware, projectController.getProjectById);

// Update a specific project by ID route
router.put("/:projectId", authMiddleware, projectController.updateProjectById);

// Delete a specific project by ID route
router.delete(
  "/:projectId",
  authMiddleware,
  projectController.deleteProjectById
);

module.exports = router;
