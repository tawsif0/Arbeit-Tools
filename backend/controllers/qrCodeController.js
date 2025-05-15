const QRCode = require("qrcode");
const Jimp = require("jimp");
const path = require("path");
const fs = require("fs");

exports.generateQRCodeWithLogo = async (req, res) => {
  const text = req.body.text;
  // Accept custom colors, fallback to defaults
  const darkColor = req.body.darkColor || "#000000";
  const lightColor = req.body.lightColor || "#ffffff";

  if (!text) return res.status(400).json({ message: "Text is required" });

  if (!req.file)
    return res.status(400).json({ message: "Logo image is required" });

  try {
    // Generate QR code PNG buffer with custom colors
    const qrBuffer = await QRCode.toBuffer(text, {
      errorCorrectionLevel: "H",
      type: "png",
      width: 500,
      margin: 1,
      color: { dark: darkColor, light: lightColor },
    });

    const qrImage = await Jimp.read(qrBuffer);
    const logoPath = path.resolve(req.file.path);
    const logo = await Jimp.read(logoPath);

    const qrWidth = qrImage.bitmap.width;

    // Max logo width/height = 40% of QR code width
    const maxLogoSize = qrWidth * 0.4;

    // Calculate scale factor (no upscale)
    const scaleFactor = Math.min(
      maxLogoSize / logo.bitmap.width,
      maxLogoSize / logo.bitmap.height,
      1
    );

    const logoWidth = logo.bitmap.width * scaleFactor;
    const logoHeight = logo.bitmap.height * scaleFactor;

    await logo.resize(logoWidth, logoHeight);

    // Padding factor: 25% of logo size
    const paddingFactor = 0.25;

    // Calculate padded background rectangle size
    const bgWidth = logoWidth * (1 + paddingFactor);
    const bgHeight = logoHeight * (1 + paddingFactor);

    // Center position for background rectangle
    const bgX = (qrWidth - bgWidth) / 2;
    const bgY = (qrWidth - bgHeight) / 2;

    // Draw white rectangle with padding behind logo
    const white = await new Jimp(bgWidth, bgHeight, 0xffffffff);
    qrImage.composite(white, bgX, bgY);

    // Center position for logo inside the padded background
    const logoX = bgX + (bgWidth - logoWidth) / 2;
    const logoY = bgY + (bgHeight - logoHeight) / 2;

    // Composite logo on top
    qrImage.composite(logo, logoX, logoY);

    const finalBuffer = await qrImage.getBufferAsync(Jimp.MIME_PNG);
    const base64 = finalBuffer.toString("base64");

    // Delete uploaded logo file
    fs.unlinkSync(logoPath);

    res.json({ qrCode: base64 });
  } catch (error) {
    console.error("QR code with logo error:", error);
    if (req.file) {
      fs.unlink(req.file.path, () => {});
    }
    res.status(500).json({ message: "QR Code generation failed" });
  }
};
