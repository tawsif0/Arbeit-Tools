// routes/gpaRoutes.js
const express = require("express");
const router = express.Router();
const { calculateGPA } = require("../controllers/gpaController");

router.post("/calculate", calculateGPA);

module.exports = router;
