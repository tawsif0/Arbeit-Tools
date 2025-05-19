const express = require("express");
const router = express.Router();

// Make sure the controller function is correctly imported
const {
  countWordsCharactersSentencesLines,
} = require("../controllers/wordCharacterController");

// Define your route with the correct handler
router.post("/count", countWordsCharactersSentencesLines); // Ensure this handler is a function

module.exports = router;
