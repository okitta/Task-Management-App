//const { PrismaClient } = require("@prisma/client");
//const prisma = new PrismaClient();
const { prisma } = require("./prisma");

async function getProjectUserId(projectId) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: Number(projectId) },
      select: { user_id: true },
    });

    return project?.user_id;
  } catch (error) {
    console.error("Error fetching project:", error);
    throw new Error("Error fetching project");
  }
}

module.exports = {
  getProjectUserId,
};
