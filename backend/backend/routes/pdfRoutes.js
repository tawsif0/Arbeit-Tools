const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload"); // Import the upload middleware
const { convertToPDF } = require("../controllers/pdfConverterController");

// File upload route
router.post("/generate", upload, (req, res) => {
  // Check if the file was successfully uploaded
  if (!req.file) {
    return res.status(400).send("No file uploaded or invalid file type.");
  }

  // Call the PDF conversion function
  convertToPDF(req, res);
});

module.exports = router;
