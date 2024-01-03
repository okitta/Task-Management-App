const { exclude } = require("../utils/miscUtils");
//const { PrismaClient } = require("@prisma/client");
//const prisma = new PrismaClient();
const { prisma } = require("../utils/prisma");

async function getUserProfile(req, res) {
  const userId = req.user.id;

  try {
    // Fetch user profile information, including projects and tasks
    let user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        projects: true,
        tasks: true,
      },
    });
    user = exclude(user, ["password"]);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { getUserProfile };
