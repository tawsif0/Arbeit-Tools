// routes/ageRoutes.js
const express = require("express");
const router = express.Router();
const { calculateAge } = require("../controllers/ageCalculatorController");

router.post("/calculate", calculateAge);

module.exports = router;
