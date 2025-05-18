// controllers/qrCodeController.js
const QRCode = require("qrcode");

exports.generateQRCode = async (req, res) => {
  const { text } = req.body;
  try {
    const qrCode = await QRCode.toDataURL(text);
    res.json({ qrCode: qrCode.split(",")[1] });
  } catch (error) {
    res.status(500).json({ message: "QR Code generation failed" });
  }
};
