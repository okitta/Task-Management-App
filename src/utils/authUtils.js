const jwt = require("jsonwebtoken");

// Create a new token
const generateToken = (id, username, email, role) => {
  const payload = { id, username, email, role };
  const secretKey = process.env.JWT_SECRET_KEY;

  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

  return token;
};

module.exports = { generateToken };
