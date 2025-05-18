// controllers/htmlEncoderDecoderController.js
exports.encodeHTML = (req, res) => {
  const { text } = req.body;
  const encoded = text.replace(
    /[\u00A0-\u9999<>&]/gim,
    (char) => `&#${char.charCodeAt(0)};`
  );
  res.json({ encoded });
};

exports.decodeHTML = (req, res) => {
  const { text } = req.body;
  const decoded = text.replace(/&#(\d+);/g, (match, dec) =>
    String.fromCharCode(dec)
  );
  res.json({ decoded });
};
