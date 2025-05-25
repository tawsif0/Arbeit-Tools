// routes/ipRoutes.js
const express = require("express");
const router = express.Router();
const { lookupIP } = require("../controllers/ipLookupController");

router.post("/lookup", lookupIP);

module.exports = router;
