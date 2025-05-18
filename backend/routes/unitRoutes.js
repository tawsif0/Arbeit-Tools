// routes/unitRoutes.js
const express = require("express");
const router = express.Router();
const { convertUnits } = require("../controllers/unitConverterController");

router.post("/convert", convertUnits);

module.exports = router;
