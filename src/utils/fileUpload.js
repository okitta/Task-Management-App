const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Set the destination folder for uploads
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4();
    cb(null, file.fieldname + "-" + uniqueSuffix); // Set a unique filename
  },
});

// Multer upload middleware
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5 MB
  },
});

module.exports = upload;
