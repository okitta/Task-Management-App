const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + file.originalname.match(/\..*$/)[0]
    );
  },
});

// Create the Multer middleware instance
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// Middleware function for handling file uploads
const attachmentMiddleware = upload.array("attachments", 5); // "attachments" should match the field name in the form

module.exports = attachmentMiddleware;
