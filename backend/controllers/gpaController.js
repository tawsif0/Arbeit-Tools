// controllers/gpaController.js
exports.calculateGPA = (req, res) => {
  const { grades } = req.body;
  if (grades.length > 0) {
    const total = grades.reduce((acc, curr) => acc + curr, 0);
    const gpa = (total / grades.length).toFixed(2);
    res.json({ gpa });
  } else {
    res.status(400).json({ message: "No grades provided" });
  }
};
