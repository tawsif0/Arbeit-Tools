// routes/loveRoutes.js
const express = require("express");
const router = express.Router();
const { calculateLove } = require("../controllers/loveCalculatorController");

router.post("/calculate", calculateLove);

module.exports = router;
