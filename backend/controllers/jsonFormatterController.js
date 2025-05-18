// controllers/jsonFormatterController.js
exports.formatJSON = (req, res) => {
  const { json } = req.body;

  try {
    const formatted = JSON.parse(json);
    res.json({ formatted });
  } catch (error) {
    res.status(400).json({ message: "Invalid JSON format" });
  }
};
