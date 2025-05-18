const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload"); // the multer config file above
const { convertToPDF } = require("../controllers/pdfConverterController");

router.post("/generate", upload.single("file"), convertToPDF);

module.exports = router;
