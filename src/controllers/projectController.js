const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getAllProjects(req, res) {
  try {
    // Check if user is an admin and a user_id is provided in the query parameters
    if (req.user.role === "admin" && req.query.user_id) {
      const projects = await prisma.project.findMany({
        where: { user_id: parseInt(req.query.user_id, 10) },
      });
      res.json(projects);
    } else {
      // Fetch all projects for the authenticated user
      const projects = await prisma.project.findMany({
        where: { user_id: req.user.id },
      });
      res.json(projects);
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createProject(req, res) {
  const { name, description } = req.body;

  try {
    // Check if user is an admin and a user_id is provided in the query parameters
    if (req.user.role === "admin" && req.query.user_id) {
      const project = await prisma.project.create({
        data: {
          name,
          description,
          user: { connect: { id: parseInt(req.query.user_id, 10) } },
        },
      });

      res.status(201).json(project);
    } else {
      // Create a new project for the authenticated user
      const project = await prisma.project.create({
        data: {
          name,
          description,
          user: { connect: { id: req.user.id } },
        },
      });

      res.status(201).json(project);
    }
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getProjectById(req, res) {
  const projectId = parseInt(req.params.projectId, 10);

  try {
    // Check if user is an admin and a user_id is provided in the query parameters
    if (req.user.role === "admin" && req.query.user_id) {
      const project = await prisma.project.findUnique({
        where: { id: projectId, user_id: parseInt(req.query.user_id, 10) },
      });
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } else {
      // Get a specific project by ID for the authenticated user
      const project = await prisma.project.findUnique({
        where: { id: projectId, user_id: req.user.id },
      });
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    }
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateProjectById(req, res) {
  const projectId = parseInt(req.params.projectId, 10);
  const { name, description } = req.body;

  try {
    // Check if user is an admin and a user_id is provided in the query parameters
    if (req.user.role === "admin" && req.query.user_id) {
      const updatedProject = await prisma.project.update({
        where: { id: projectId, user_id: parseInt(req.query.user_id, 10) },
        data: { name, description },
      });

      res.json(updatedProject);
    } else {
      // Update a specific project by ID for the authenticated user
      const updatedProject = await prisma.project.update({
        where: { id: projectId, user_id: req.user.id },
        data: { name, description },
      });

      res.json(updatedProject);
    }
  } catch (error) {
    console.error("Error updating project by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteProjectById(req, res) {
  const projectId = parseInt(req.params.projectId, 10);

  try {
    // Check if user is an admin and a user_id is provided in the query parameters
    if (req.user.role === "admin" && req.query.user_id) {
      // Delete a specific project by ID for the specified user
      await prisma.project.delete({
        where: { id: projectId, user_id: parseInt(req.query.user_id, 10) },
      });
    } else {
      // Delete a specific project by ID for the authenticated user
      await prisma.project.delete({
        where: { id: projectId, user_id: req.user.id },
      });
    }

    res.status(204).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Validate project creation data
const validateProjectCreation = (req, res, next) => {
  const { name } = req.body;

  // Check if required fields are present
  if (!name) {
    return res.status(400).json({ error: "Project name is required" });
  }

  next();
};

module.exports = {
  getAllProjects,
  createProject,
  getProjectById,
  updateProjectById,
  deleteProjectById,
  validateProjectCreation,
};
