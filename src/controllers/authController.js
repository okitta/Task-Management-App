//const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { generateToken } = require("../utils/authUtils");
const { prisma } = require("../utils/prisma");
//const prisma = new PrismaClient();

//Temp: Get list of users
async function getUsers(req, res) {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function registerUser(req, res) {
  const { username, email, password, role = "user" } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Create a new user in the database
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role,
      },
    });

    // Respond with the created user
    res.status(201).json(user);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Verify the password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!user || !passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = generateToken(user.id, user.username, user.email, user.role);

    // Respond with the generated token
    res.json({ token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Validate user registration data
const validateUserRegistration = (req, res, next) => {
  const { username, email, password } = req.body;

  // Check if required fields are present
  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Validate username and email uniqueness
  prisma.user
    .findMany({
      where: {
        OR: [{ username }, { email }],
      },
    })
    .then((existingUsers) => {
      const duplicateUsername = existingUsers.some(
        (user) => user.username === username
      );
      const duplicateEmail = existingUsers.some((user) => user.email === email);

      if (duplicateUsername) {
        return res.status(400).json({ error: "Username is already taken" });
      }

      if (duplicateEmail) {
        return res.status(400).json({ error: "Email is already taken" });
      }

      next();
    })
    .catch((error) => {
      console.error("Error validating user registration:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

module.exports = {
  registerUser,
  loginUser,
  validateUserRegistration,
  getUsers,
};
