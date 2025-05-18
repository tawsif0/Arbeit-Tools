// routes/hexToRgbRoutes.js
const express = require("express");
const router = express.Router();
const { convertHexToRgb } = require("../controllers/hexToRgbController");

router.post("/convert", convertHexToRgb);

module.exports = router;
