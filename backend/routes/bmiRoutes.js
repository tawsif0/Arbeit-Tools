// routes/bmiRoutes.js
const express = require("express");
const router = express.Router();
const { calculateBMI } = require("../controllers/bmiController");

router.post("/calculate", calculateBMI);

module.exports = router;
