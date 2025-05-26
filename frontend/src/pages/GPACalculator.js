import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiTrash2, FiStar, FiSettings, FiX } from "react-icons/fi";
import "./GPACal.css";

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
  P: 1.0,
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

const GPACalculator = () => {
  const [semesters, setSemesters] = useState([
    {
      id: Date.now(),
      courses: [{ id: Date.now() + 1, name: "", credits: "", grade: "" }],
      editingGrades: false,
      gradeMap: americanGradeMap,
    },
  ]);

  const [gpa, setGpa] = useState(null);
  const [error, setError] = useState("");
  const [gradeSystem, setGradeSystem] = useState("american");
  const [isCalculating, setIsCalculating] = useState(false);

  // Update grade system across all semesters
  const updateGradeSystem = (newSystem) => {
    setGradeSystem(newSystem);
    setSemesters((prev) =>
      prev.map((sem) => ({
        ...sem,
        gradeMap: newSystem === "american" ? americanGradeMap : britishGradeMap,
        courses: sem.courses.map((c) =>
          (newSystem === "american" ? americanGradeMap : britishGradeMap)[
            c.grade
          ]
            ? c
            : { ...c, grade: "" }
        ),
      }))
    );
    resetErrorAndGPA();
  };

  const resetErrorAndGPA = () => {
    setError("");
    setGpa(null);
  };

  // Add new semester with animation
  const addSemester = () => {
    const newSemester = {
      id: Date.now() + Math.random(),
      courses: [
        { id: Date.now() + Math.random(), name: "", credits: "", grade: "" },
      ],
      editingGrades: false,
      gradeMap: gradeSystem === "american" ? americanGradeMap : britishGradeMap,
    };
    setSemesters([...semesters, newSemester]);
    resetErrorAndGPA();
  };

  // Update course with smooth transitions
  const updateCourse = (semesterId, courseId, field, value) => {
    setSemesters((prev) =>
      prev.map((sem) => {
        if (sem.id !== semesterId) return sem;
        return {
          ...sem,
          courses: sem.courses.map((course) =>
            course.id === courseId ? { ...course, [field]: value } : course
          ),
        };
      })
    );
    resetErrorAndGPA();
  };

  // Add course with animation
  const addCourse = (semesterId) => {
    setSemesters((prev) =>
      prev.map((sem) =>
        sem.id === semesterId
          ? {
              ...sem,
              courses: [
                ...sem.courses,
                {
                  id: Date.now() + Math.random(),
                  name: "",
                  credits: "",
                  grade: "",
                },
              ],
            }
          : sem
      )
    );
    resetErrorAndGPA();
  };

  // Remove course (without confirmation)
  const removeCourse = (semesterId, courseId) => {
    setSemesters((prev) =>
      prev.map((sem) =>
        sem.id === semesterId
          ? {
              ...sem,
              courses: sem.courses.filter((course) => course.id !== courseId),
            }
          : sem
      )
    );
    resetErrorAndGPA();
  };

  // Remove semester (without confirmation)
  const removeSemester = (semesterId) => {
    setSemesters((prev) => prev.filter((s) => s.id !== semesterId));
    resetErrorAndGPA();
  };

  // Toggle grade editing with animation
  const toggleEditingGrades = (semesterId) => {
    setSemesters((prev) =>
      prev.map((sem) =>
        sem.id === semesterId
          ? { ...sem, editingGrades: !sem.editingGrades }
          : sem
      )
    );
  };

  // Handle grade changes with validation
  const handleGradeChange = (semesterId, key, value) => {
    const numValue = parseFloat(value) || 0;
    setSemesters((prev) =>
      prev.map((sem) =>
        sem.id === semesterId
          ? { ...sem, gradeMap: { ...sem.gradeMap, [key]: numValue } }
          : sem
      )
    );
    resetErrorAndGPA();
  };

  // Handle grade removal with animation
  const handleRemoveGrade = (semesterId, key) => {
    setSemesters((prev) =>
      prev.map((sem) => {
        if (sem.id !== semesterId) return sem;
        const newMap = { ...sem.gradeMap };
        delete newMap[key];
        const newCourses = sem.courses.map((c) =>
          c.grade === key ? { ...c, grade: "" } : c
        );
        return { ...sem, gradeMap: newMap, courses: newCourses };
      })
    );
    resetErrorAndGPA();
  };

  // Clear all with confirmation
  const clearAll = () => {
    setSemesters([
      {
        id: Date.now(),
        courses: [{ id: Date.now() + 1, name: "", credits: "", grade: "" }],
        editingGrades: false,
        gradeMap:
          gradeSystem === "american" ? americanGradeMap : britishGradeMap,
      },
    ]);
    setGpa(null);
    setError("");
  };

  // Calculate GPA with loading state
  const calculateGPA = async () => {
    setIsCalculating(true);
    try {
      const allValidCourses = semesters.flatMap((sem) =>
        sem.courses
          .filter(
            (c) =>
              c.credits &&
              c.grade &&
              !isNaN(c.credits) &&
              sem.gradeMap[c.grade] !== undefined
          )
          .map((c) => ({ ...c, grade: sem.gradeMap[c.grade] }))
      );

      if (allValidCourses.length === 0) {
        setError("Please enter at least one valid course");
        setIsCalculating(false);
        return;
      }

      const res = await axios.post("http://localhost:5000/api/gpa/calculate", {
        courses: allValidCourses,
      });

      // Ensure the GPA is a number before setting state
      const calculatedGPA =
        typeof res.data.gpa === "number"
          ? res.data.gpa
          : Number(res.data.gpa) || null;

      setGpa(calculatedGPA);
      setError("");
    } catch {
      setError("Calculation failed. Please check your inputs.");
      setGpa(null);
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <motion.div
      className="gpa-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="gpa-header">
        <motion.h1
          className="gpa-title"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.1 }}
        >
          GPA Calculator
        </motion.h1>
        <p className="gpa-subtitle">
          Transform your grades into golden insights
        </p>

        <div className="system-toggle">
          <motion.button
            className={`toggle-btn ${
              gradeSystem === "american" ? "active" : ""
            }`}
            onClick={() => updateGradeSystem("american")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            American System
          </motion.button>
          <motion.button
            className={`toggle-btn ${
              gradeSystem === "british" ? "active" : ""
            }`}
            onClick={() => updateGradeSystem("british")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            British System
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {semesters.map((sem, index) => (
          <motion.div
            key={sem.id}
            className="semester-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="semester-header">
              <h3>Semester {index + 1}</h3>
              {index > 0 && (
                <motion.button
                  className="remove-semester"
                  onClick={() => removeSemester(sem.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiTrash2 />
                </motion.button>
              )}
            </div>

            <div className="courses-container">
              <AnimatePresence>
                {sem.courses.map((course) => (
                  <motion.div
                    key={course.id}
                    className="course-row"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input
                      type="text"
                      className="course-input"
                      placeholder="Course name"
                      value={course.name}
                      onChange={(e) =>
                        updateCourse(sem.id, course.id, "name", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      className="credits-input"
                      placeholder="Credits"
                      value={course.credits}
                      onChange={(e) =>
                        updateCourse(
                          sem.id,
                          course.id,
                          "credits",
                          e.target.value
                        )
                      }
                      min="1"
                      step="0.5"
                    />
                    <select
                      className="grade-select"
                      value={course.grade}
                      onChange={(e) =>
                        updateCourse(sem.id, course.id, "grade", e.target.value)
                      }
                    >
                      <option value="">Select grade</option>
                      {Object.keys(sem.gradeMap).map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                    {sem.courses.length > 1 && (
                      <motion.button
                        className="remove-course"
                        onClick={() => removeCourse(sem.id, course.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiX />
                      </motion.button>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="semester-actions">
              <motion.button
                className="add-course-btn"
                onClick={() => addCourse(sem.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiPlus /> Add Course
              </motion.button>
              <motion.button
                className={`grade-settings-btn ${
                  sem.editingGrades ? "active" : ""
                }`}
                onClick={() => toggleEditingGrades(sem.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiSettings />{" "}
                {sem.editingGrades ? "Hide Settings" : "Grade Settings"}
              </motion.button>
            </div>

            <AnimatePresence>
              {sem.editingGrades && (
                <motion.div
                  className="grade-settings"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <h4>Grade Point Values</h4>
                  <div className="grade-map-grid">
                    {Object.entries(sem.gradeMap).map(([key, val]) => (
                      <div key={key} className="grade-map-item">
                        <label>{key}</label>
                        <input
                          type="number"
                          step="0.01"
                          value={val}
                          onChange={(e) =>
                            handleGradeChange(sem.id, key, e.target.value)
                          }
                        />
                        <motion.button
                          className="remove-grade"
                          onClick={() => handleRemoveGrade(sem.id, key)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FiX />
                        </motion.button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="global-actions">
        <motion.button
          className="add-semester-btn"
          onClick={addSemester}
          whileHover={{ scale: 1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiPlus /> Add Semester
        </motion.button>
        <div className="action-buttons">
          <motion.button
            className="clear-btn"
            onClick={clearAll}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiTrash2 /> Clear All
          </motion.button>
          <motion.button
            className="calculate-btn"
            onClick={calculateGPA}
            disabled={isCalculating}
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isCalculating ? (
              <span className="spinner"></span>
            ) : (
              <>
                Calculate GPA <FiStar />
              </>
            )}
          </motion.button>
        </div>
      </div>

      {error && <div className="bmi-alert error">⚠️ {error}</div>}

      <AnimatePresence>
        {gpa !== null && !error && typeof gpa === "number" && (
          <motion.div
            className="gpa-result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="result-headers">
              <h3>Your Academic Result</h3>
            </div>
            <div className="gpa-value">{gpa.toFixed(2)}</div>
            <div className="star-rating">
              {Array.from({ length: 4 }).map((_, i) => (
                <FiStar
                  key={i}
                  className={`star ${i < Math.floor(gpa) ? "filled" : ""}`}
                />
              ))}
            </div>
            <div className="result-description">
              {gpa >= 3.7
                ? "Summa Cum Laude - Outstanding Achievement!"
                : gpa >= 3.3
                ? "Magna Cum Laude - Excellent Work!"
                : gpa >= 3.0
                ? "Cum Laude - Great Job!"
                : gpa >= 2.0
                ? "Solid Performance - Keep Improving!"
                : "Needs Improvement - You Can Do Better!"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GPACalculator;
