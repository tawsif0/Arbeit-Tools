// server.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

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
// Start Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
