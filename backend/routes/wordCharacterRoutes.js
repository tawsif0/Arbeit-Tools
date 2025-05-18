// routes/wordCharacterRoutes.js
const express = require("express");
const router = express.Router();
const {
  countWordsAndCharacters
} = require("../controllers/wordCharacterController");

router.post("/count", countWordsAndCharacters);

module.exports = router;
