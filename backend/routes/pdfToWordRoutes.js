const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const { convertPdfToWord } = require("../controllers/pdfToWordController");

// Upload directory
const uploadDir = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    // Optionally sanitize and create unique filename here if needed
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

router.post("/convert", upload.single("file"), convertPdfToWord);

module.exports = router;
