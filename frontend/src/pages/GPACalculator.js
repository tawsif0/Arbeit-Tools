import React, { useState } from "react";
import axios from "axios";
import "./GPACal.css";

const defaultGradeMap = {
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
  NP: 0.0
};

const GPACalculator = () => {
  const [mode, setMode] = useState("normal");
  const [grades, setGrades] = useState("");
  const [gpa, setGpa] = useState(null);
  const [error, setError] = useState("");
  const [courses, setCourses] = useState([
    { id: 1, name: "", credits: "", grade: "" }
  ]);
  const [gradeMap, setGradeMap] = useState(defaultGradeMap);
  const [editingGrades, setEditingGrades] = useState(false);

  const calculateGPA = async () => {
    try {
      if (mode === "normal") {
        const gradeList = grades
          .split(",")
          .map((g) => parseFloat(g.trim()))
          .filter((g) => !isNaN(g));

        if (gradeList.length === 0) {
          setError("Enter valid comma separated grades.");
          setGpa(null);
          return;
        }

        const res = await axios.post(
          "http://localhost:5000/api/gpa/calculate",
          {
            grades: gradeList
          }
        );
        setGpa(res.data.gpa);
      } else {
        const validCourses = courses.filter(
          (c) => c.credits && c.grade && !isNaN(c.credits) && gradeMap[c.grade]
        );

        if (validCourses.length === 0) {
          setError("Please enter at least one valid course.");
          return;
        }

        const gradePoints = validCourses.map((c) => ({
          ...c,
          grade: gradeMap[c.grade]
        }));
        const res = await axios.post(
          "http://localhost:5000/api/gpa/calculate",
          {
            courses: gradePoints
          }
        );
        setGpa(res.data.gpa);
      }
      setError("");
    } catch {
      setError("Calculation failed");
      setGpa(null);
    }
  };

  const addCourse = () => {
    setCourses([
      ...courses,
      { id: Date.now() + Math.random(), name: "", credits: "", grade: "" }
    ]);
  };

  const updateCourse = (id, field, value) => {
    setCourses(
      courses.map((course) =>
        course.id === id ? { ...course, [field]: value } : course
      )
    );
  };

  const removeCourse = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const clearAll = () => {
    setCourses([{ id: 1, name: "", credits: "", grade: "" }]);
    setGpa(null);
    setError("");
  };

  const handleGradeChange = (key, value) => {
    setGradeMap((prev) => ({ ...prev, [key]: parseFloat(value) || 0 }));
  };
  const handleRemoveGrade = (gradeKey) => {
    setGradeMap((prev) => {
      const newMap = { ...prev };
      delete newMap[gradeKey];
      return newMap;
    });
  };

  return (
    <div className="gpa-calculator">
      <div className="gpa-header">
        <h2 className="gpa-title">Grade Master</h2>
        <p className="gpa-subtitle">Calculate your GPA in style</p>

        <div className="mode-toggle">
          <button
            className={`toggle-btn ${mode === "normal" ? "active" : ""}`}
            onClick={() => setMode("normal")}
          >
            Normal
          </button>
          <button
            className={`toggle-btn ${mode === "advanced" ? "active" : ""}`}
            onClick={() => setMode("advanced")}
          >
            Advanced
          </button>
        </div>
      </div>

      {mode === "normal" ? (
        <div className="gpa-input-group">
          <input
            type="text"
            className="gpa-input"
            placeholder="Enter grades (e.g., 3.5, 4.0, 3.8)..."
            value={grades}
            onChange={(e) => setGrades(e.target.value)}
          />
          <button className="gpa-button" onClick={calculateGPA}>
            <span className="gpa-button-text">Calculate</span>
            <span className="gpa-button-icon">📊</span>
          </button>
        </div>
      ) : (
        <div className="advanced-form">
          <div className="courses-list">
            {courses.map((course) => (
              <div key={course.id} className="course-row">
                <input
                  type="text"
                  className="course-input"
                  placeholder="Course name"
                  value={course.name}
                  onChange={(e) =>
                    updateCourse(course.id, "name", e.target.value)
                  }
                />
                <input
                  type="number"
                  className="credits-input"
                  placeholder="Credits"
                  value={course.credits}
                  onChange={(e) =>
                    updateCourse(course.id, "credits", e.target.value)
                  }
                  min="1"
                  step="0.5"
                />
                <select
                  className="grade-select"
                  value={course.grade}
                  onChange={(e) =>
                    updateCourse(course.id, "grade", e.target.value)
                  }
                >
                  <option value="">Grade</option>
                  {Object.keys(gradeMap).map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
                {courses.length > 1 && (
                  <button
                    className="remove-course"
                    onClick={() => removeCourse(course.id)}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="form-actions">
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <button className="add-course" onClick={addCourse}>
                + Add Course
              </button>
              <button
                className="add-course"
                onClick={() => setEditingGrades(!editingGrades)}
              >
                {editingGrades ? "Close Grade Settings" : "Set Grades"}
              </button>
            </div>
            {editingGrades && (
              <div className="edit-grade-map">
                {Object.entries(gradeMap).map(([key, val]) => (
                  <div key={key} className="grade-map-entry">
                    <label>{key}</label>
                    <input
                      type="number"
                      step="0.01"
                      value={val}
                      onChange={(e) => handleGradeChange(key, e.target.value)}
                    />
                    <button
                      className="remove-grade"
                      onClick={() => handleRemoveGrade(key)}
                      style={{
                        minWidth: "44px",
                        minHeight: "44px",
                        padding: "10px"
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="action-buttons">
              <button className="secondary-btn" onClick={clearAll}>
                Clear
              </button>
              <button className="primary-btn" onClick={calculateGPA}>
                Calculate GPA
              </button>
            </div>
          </div>
        </div>
      )}

      {error && <div className="gpa-alert gpa-alert-error">{error}</div>}

      {gpa !== null && !error && (
        <div className="gpa-result">
          <div className="gpa-result-label">Your GPA</div>
          <div className="gpa-result-score">{gpa}</div>
          <div className="gpa-result-stars">
            {Array.from({ length: Math.floor(gpa) }).map((_, i) => (
              <span key={i}>⭐</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GPACalculator;
