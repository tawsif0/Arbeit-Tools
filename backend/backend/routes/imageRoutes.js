// routes/imageRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { convertImage } = require("../controllers/imageConverterController");

const upload = multer({ dest: "uploads/" });

router.post("/convert", upload.single("file"), convertImage);

module.exports = router;
