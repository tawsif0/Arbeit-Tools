const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs"); // <--- Add this

const upload = multer({ dest: "uploads/" });

exports.convertImage = (req, res) => {
  const filePath = req.file.path;
  const outputPath = `uploads/${req.file.filename}.png`;

  sharp(filePath)
    .toFormat("png")
    .toFile(outputPath, (err) => {
      if (err) {
        return res.status(500).json({ message: "Image conversion failed" });
      }
      res.download(outputPath, () => {
        // Delete both original and converted files after sending
        fs.unlinkSync(filePath);
        fs.unlinkSync(outputPath);
      });
    });
};
