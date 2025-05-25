// controllers/bmiController.js
exports.calculateBMI = (req, res) => {
  const { weight, height } = req.body;
  if (weight > 0 && height > 0) {
    const bmi = (weight / (height * height)).toFixed(2);
    res.json({ bmi });
  } else {
    res.status(400).json({ message: "Invalid weight or height" });
  }
};
