// routes/jsonRoutes.js
const express = require("express");
const router = express.Router();
const { formatJSON } = require("../controllers/jsonFormatterController");

router.post("/format", formatJSON);

module.exports = router;
