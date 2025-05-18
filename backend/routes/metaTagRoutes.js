// routes/metaTagRoutes.js
const express = require("express");
const router = express.Router();
const { generateMetaTags } = require("../controllers/metaTagController");

router.post("/generate", generateMetaTags);

module.exports = router;
