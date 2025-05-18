// routes/htmlRoutes.js
const express = require("express");
const router = express.Router();
const {
  encodeHTML,
  decodeHTML
} = require("../controllers/htmlEncoderDecoderController");

router.post("/encode", encodeHTML);
router.post("/decode", decodeHTML);

module.exports = router;
