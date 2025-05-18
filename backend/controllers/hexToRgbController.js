// controllers/hexToRgbController.js
exports.convertHexToRgb = (req, res) => {
  const { hex } = req.body;
  const color = hex.substring(1);
  const rgb = [
    parseInt(color.substring(0, 2), 16),
    parseInt(color.substring(2, 4), 16),
    parseInt(color.substring(4, 6), 16)
  ].join(", ");
  res.json({ rgb: `rgb(${rgb})` });
};
