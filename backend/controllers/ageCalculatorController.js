// controllers/ageCalculatorController.js
exports.calculateAge = (req, res) => {
  const { dob } = req.body;
  const birthDate = new Date(dob);
  const age = new Date().getFullYear() - birthDate.getFullYear();
  res.json({ age });
};
