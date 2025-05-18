// routes/qrRoutes.js
const express = require("express");
const router = express.Router();
const { generateQRCode } = require("../controllers/qrCodeController");

router.post("/generate", generateQRCode);

module.exports = router;
