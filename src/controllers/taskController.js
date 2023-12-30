const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Fetch all tasks for a specific project
const getAllTasksForProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Check if user is an admin and a user_id is provided in the query parameters
    if (req.user.role === "admin" && req.query.user_id) {
      const tasks = await prisma.task.findMany({
        where: {
          project_id: Number(projectId),
          user_id: parseInt(req.query.user_id, 10),
        },
      });
      res.status(200).json(tasks);
    } else {
      // Fetch all tasks for the authenticated user within the project
      const tasks = await prisma.task.findMany({
        where: { project_id: Number(projectId), user_id: req.user.id },
      });
      res.status(200).json(tasks);
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new task within a project
const createTask = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title, description, due_date } = req.body;

    // Check if user is an admin and a user_id is provided in the query parameters
    if (req.user.role === "admin" && req.query.user_id) {
      // Create a new task for the specified user within the project
      const task = await prisma.task.create({
        data: {
          title,
          description,
          due_date: new Date(due_date),
          project_id: Number(projectId),
          user_id: parseInt(req.query.user_id, 10),
        },
      });

      res.status(201).json(task);
    } else {
      // Create a new task for the authenticated user within the project
      const task = await prisma.task.create({
        data: {
          title,
          description,
          due_date: new Date(due_date),
          project_id: Number(projectId),
          user_id: req.user.id,
        },
      });

      res.status(201).json(task);
    }
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Fetch a specific task by ID
const getTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;

    // Check if user is an admin and a user_id is provided in the query parameters
    if (req.user.role === "admin" && req.query.user_id) {
      const task = await prisma.task.findUnique({
        where: { id: Number(taskId), user_id: parseInt(req.query.user_id, 10) },
      });

      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      res.status(200).json(task);
    } else {
      // Fetch a specific task by ID for the authenticated user
      const task = await prisma.task.findUnique({
        where: { id: Number(taskId), user_id: req.user.id },
      });

      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      res.status(200).json(task);
    }
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a specific task by ID
const updateTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, due_date, completed } = req.body;

    // Check if user is an admin and a user_id is provided in the query parameters
    if (req.user.role === "admin" && req.query.user_id) {
      const updatedTask = await prisma.task.update({
        where: { id: Number(taskId), user_id: parseInt(req.query.user_id, 10) },
        data: { title, description, due_date: new Date(due_date), completed },
      });

      res.status(200).json(updatedTask);
    } else {
      // Update a specific task by ID for the authenticated user
      const updatedTask = await prisma.task.update({
        where: { id: Number(taskId), user_id: req.user.id },
        data: { title, description, due_date: new Date(due_date), completed },
      });

      res.status(200).json(updatedTask);
    }
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a specific task by ID
const deleteTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;

    // Check if user is an admin and a user_id is provided in the query parameters
    if (req.user.role === "admin" && req.query.user_id) {
      // Delete a specific task by ID for the specified user
      await prisma.task.delete({
        where: { id: Number(taskId), user_id: parseInt(req.query.user_id, 10) },
      });
    } else {
      // Delete a specific task by ID for the authenticated user
      await prisma.task.delete({
        where: { id: Number(taskId), user_id: req.user.id },
      });
    }

    res.status(204).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Validate task creation data
const validateTaskCreation = (req, res, next) => {
  const { title } = req.body;

  // Check if required fields are present
  if (!title) {
    return res.status(400).json({ error: "Task title is required" });
  }

  next();
};

module.exports = {
  getAllTasksForProject,
  createTask,
  getTaskById,
  updateTaskById,
  deleteTaskById,
  validateTaskCreation,
};
