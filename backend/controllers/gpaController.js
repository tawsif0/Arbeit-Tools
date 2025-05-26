const americanGradeMap = {
  "A+": 4.0,
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  "D+": 1.3,
  D: 1.0,
  "D-": 0.7,
  F: 0.0,
  P: 4.0,
  NP: 0.0,
};

const britishGradeMap = {
  "First Class": 4.0,
  "Upper Second Class": 3.3,
  "Lower Second Class": 2.7,
  "Third Class": 2.0,
  Pass: 1.0,
  Fail: 0.0,
};

const getGradeMap = (system) => {
  if (system === "british") {
    return britishGradeMap;
  } else {
    return americanGradeMap; // Default to American grading system
  }
};

exports.calculateGPA = (req, res) => {
  const { grades, courses, system } = req.body;

  // Determine which grade map to use
  const gradeMap = getGradeMap(system);

  try {
    if (grades && grades.length > 0) {
      const validGrades = grades.filter((g) => !isNaN(g));
      if (validGrades.length === 0) {
        return res.status(400).json({ message: "Invalid grades provided" });
      }
      const total = validGrades.reduce((acc, curr) => acc + curr, 0);
      const gpa = Number((total / validGrades.length).toFixed(2)); // convert to number
      return res.json({ gpa });
    } else if (courses && courses.length > 0) {
      let totalCredits = 0;
      let weightedSum = 0;

      for (const course of courses) {
        const credit = parseFloat(course.credits);
        let gradeValue = parseFloat(course.grade);

        if (isNaN(gradeValue)) {
          const letter = course.grade.toUpperCase();
          if (gradeMap.hasOwnProperty(letter)) {
            gradeValue = gradeMap[letter];
          } else {
            return res
              .status(400)
              .json({ message: `Invalid grade: ${course.grade}` });
          }
        }

        if (!isNaN(credit) && !isNaN(gradeValue)) {
          totalCredits += credit;
          weightedSum += credit * gradeValue;
        }
      }

      if (totalCredits === 0) {
        return res.status(400).json({ message: "Invalid course data" });
      }

      const gpa = Number((weightedSum / totalCredits).toFixed(2)); // convert to number
      return res.json({ gpa });
    } else {
      return res.status(400).json({ message: "No grades or courses provided" });
    }
  } catch (error) {
    console.error("GPA calculation error:", error);
    return res
      .status(500)
      .json({ message: "Server error during GPA calculation" });
  }
};
