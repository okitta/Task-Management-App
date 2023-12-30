const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const roleMiddleware = (requiredRole) => async (req, res, next) => {
  const { role, id } = req.user;

  try {
    let ownerId;

    // Retrieve the owner ID from the database based on the resource type
    if (req.params.projectId) {
      const project = await prisma.project.findUnique({
        where: { id: parseInt(req.params.projectId) },
        select: { user_id: true },
      });
      ownerId = project?.user_id;
    } else if (req.params.taskId) {
      const task = await prisma.task.findUnique({
        where: { id: parseInt(req.params.taskId) },
        select: { user_id: true },
      });

      ownerId = task?.user_id;
    } else {
      ownerId = id;
    }

    if (role === requiredRole || id === ownerId) {
      // Allow access for admins or the user owns the resource
      next();
    } else {
      console.log("Unauthorized", id, ownerId, requiredRole);
      return res
        .status(403)
        .json({ error: "Unauthorized: Insufficient privileges" });
    }
  } catch (error) {
    console.error("Error retrieving owner:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = roleMiddleware;
