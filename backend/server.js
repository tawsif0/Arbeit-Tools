const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const upload = require("./middlewares/upload"); // Import the upload middleware
const app = express();
const PORT = 5000;

// Middleware for CORS and JSON handling
app.use(cors());
app.use(express.json());

// Serve static files from 'uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("Created uploads directory:", uploadDir);
}

// Routes
app.use("/api/base64", require("./routes/base64Routes"));
app.use("/api/bmi", require("./routes/bmiRoutes"));
app.use("/api/gpa", require("./routes/gpaRoutes"));
app.use("/api/hex", require("./routes/hexToRgbRoutes"));
app.use("/api/html", require("./routes/htmlRoutes"));
app.use("/api/ip", require("./routes/ipRoutes"));
app.use("/api/json", require("./routes/jsonRoutes"));
app.use("/api/love", require("./routes/loveRoutes"));
app.use("/api/pdf", require("./routes/pdfRoutes"));
app.use("/api/qr", require("./routes/qrRoutes"));
app.use("/api/unit", require("./routes/unitRoutes"));
app.use("/api/age", require("./routes/ageRoutes"));
app.use("/api/image", require("./routes/imageRoutes"));
app.use("/api/meta", require("./routes/metaTagRoutes"));
app.use("/api/word-character", require("./routes/wordCharacterRoutes"));
app.use("/api/pdf-to-word", require("./routes/pdfToWordRoutes"));

// File upload route example
app.post("/upload", upload, (req, res) => {
  // If no file was uploaded or there was a file validation error
  if (!req.file) {
    return res.status(400).send("No file uploaded or invalid file type.");
  }

  console.log("Received file:", req.file); // Log the uploaded file
  res.send("File uploaded successfully");
});

// Global error handling middleware for file upload errors
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Handle multer-specific errors (e.g., file too large)
  if (err instanceof multer.MulterError) {
    return res.status(400).send(`File upload error: ${err.message}`);
  }

  // Handle custom validation errors (e.g., invalid file type)
  if (err.message && err.message.includes("Invalid file type")) {
    return res.status(400).send(err.message);
  }

  // Other generic errors
  res.status(500).send("Something went wrong!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
