const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const { convertPdfToWord } = require("../controllers/pdfToWordController");

// Upload directory
const uploadDir = path.join(__dirname, "..", "uploads");

// Create uploads directory if missing
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Allowed file types (in this case, PDF files)
const allowedMimeTypes = ["application/pdf"];

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save the file to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    // Make the filename unique by appending timestamp and random number
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension); // Prevent overwriting
  },
});

// File validation function
const fileFilter = (req, file, cb) => {
  // Check if the file is a PDF
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    console.error("Invalid file type:", file.mimetype);
    cb(new Error("Invalid file type. Only PDF files are allowed."), false); // Reject the file
  }
};

// Multer file upload configuration with validation
const upload = multer({
  storage,
  fileFilter, // Apply the file type filter
  limits: { fileSize: 50 * 1024 * 1024 }, // Limit file size to 50MB
});

// Route to handle PDF to Word conversion
router.post("/convert", upload.single("file"), convertPdfToWord, (req, res) => {
  // If no file was uploaded or an error occurred
  if (!req.file) {
    return res.status(400).send("No file uploaded or invalid file type.");
  }

  // Proceed to handle successful file upload and conversion
  res.send("File uploaded and converted successfully.");
});

// Error handling middleware for file upload and conversion
router.use((err, req, res, next) => {
  if (err.message === "Invalid file type. Only PDF files are allowed.") {
    return res.status(400).send(err.message);
  }

  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).send("File size exceeds the 50MB limit.");
  }

  console.error("Error:", err);
  res.status(500).send("An error occurred during file processing.");
});

module.exports = router;
