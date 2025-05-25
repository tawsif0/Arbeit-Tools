// routes/base64Routes.js
const express = require("express");
const router = express.Router();
const { encode, decode } = require("../controllers/base64Controller");

router.post("/encode", encode);
router.post("/decode", decode);

module.exports = router;
